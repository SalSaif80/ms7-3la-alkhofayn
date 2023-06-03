let days = [
    'السبت',
    'الأحد',
    'الإثنين',
    'الثلاثاء',
    'الإربعاء',
    'الخميس',
    'الجمعة',
]
let radioButtons = document.querySelectorAll('input[type="radio"]')
let calcBtn = document.getElementById('calculate')
selectDay = document.getElementById('selectDay')
let selectedSize;
let minute = document.getElementById('minute')
let hour = document.getElementById('hour')
let saveDataBtn = document.getElementById('saveData')

let ms7Array;
if(localStorage.ms7ArrayStorageFormosafer != null){
    ms7Array = JSON.parse(localStorage.ms7ArrayStorageFormosafer)
}else{
    ms7Array = []
}




let counter //use this to increase the counter in ID in new object 



function show_data_on_the_table(){
    document.getElementById('tableBody').innerHTML = ''
    counter = 0;
    
    for (i of ms7Array) {
        document.getElementById('tableBody').innerHTML += `
            <tr>
                <td class="align-middle">${i.dayName}</td>
                <td class="align-middle">${i.minuteTime+" : "+ i.hourTime}</td>
                <td class="align-middle">${i.TimeZone}</td>
                <td class="align-middle">
                    <button id="deleteBtn" onclick="delete_data(${counter})" type="button" class="btn btn-outline-danger text-light">حذف</button>
                </td>
            </tr>
        `
        counter = counter + 1;
    }
    if(0 >= ms7Array.length){
        document.getElementById('tableBody').innerHTML = `
        <tr>
            <td class="align-middle"></td>
            <td colspan='2' class="align-middle">لا توجد بيانات لعرضها</td>
            
            <td class="align-middle"></td>
            
            
        </tr>
        `;
    }
    
}

function delete_data(counter){
    ms7Array.splice(counter,1);
    set_locale_storage()
    show_data_on_the_table()
}

function print_days_in_select_tag(){
    for (day of days) {
        document.getElementById('selectDay').innerHTML += `
        <option value="${day}">${day}</option>
        `
    }
}

function print_minute(){
    for (let index = 0; index < 60; index++) {
        if(index < 10){
            document.getElementById('minute').innerHTML += `
            <option>0${index}</option>
            `    
        }
        if(index >= 10){
            document.getElementById('minute').innerHTML += `
            <option>${index}</option>
            `
        }
    }
}

function print_hour(){
    for (let index = 1; index <= 12; index++) {
        if(index < 10 ){
            document.getElementById('hour').innerHTML += `
                <option>0${index}</option>
            `
        }
        if(index >= 10){
            document.getElementById('hour').innerHTML += `
                <option>${index}</option>
            `
        }
    }
}

function end_msh_time(){
    for (let i = 0; i < days.length; i++) {
        if(!(selectDay.value == 'اختر يوم المسح')){
            if(days[i] === selectDay.value){
                if(days[i] === 'الإربعاء'){
                    return days[0]
                }
                else if(days[i] === 'الخميس'){
                    return days[1]
                }
                else if(days[i] === 'الجمعة'){
                    return days[2]
                }
                else{
                    return days[i+3]
                }
            }
        }else{
            break
        }
    }
}

function radio_button_checked(){
    for (radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedSize = radioButton.value;
            break;
        }
    }
    return  selectedSize
}

function add_new_object(){
    let newObj = {
        'dayName':end_msh_time(),
        'hourTime':hour.value,
        'minuteTime':minute.value,
        'TimeZone':radio_button_checked()
        
    }
    ms7Array.push(newObj)
    show_data_on_the_table()
    counter++;
    
}

function set_locale_storage(){
    let toStringArray = JSON.stringify(ms7Array)
    localStorage.setItem("ms7ArrayStorageFormosafer", toStringArray)
}

function clear_date(){
    // selectDay.value="اختر يوم المسح";
    // document.getElementById('hour').value="الساعة";
    // document.getElementById('minute').value="الدقائق";
    
    // if((radioButton.checked)){
    //     selectedSize = undefined;
    //     document.getElementById('sabah').checked = false;
    //     document.getElementById('masa').checked = false;
    // }
}

print_days_in_select_tag()
print_minute()
print_hour()
show_data_on_the_table()


calcBtn.addEventListener('click', function(event){
    radio_button_checked()
    if(!(end_msh_time() === undefined) && !(radio_button_checked() === undefined) && !(minute.value === 'الدقائق') && !(hour.value === 'الساعة') ){
        document.getElementById('endMshTime').innerHTML = `
            تنتهي مدة المسح في يوم ${end_msh_time()}، في تمام الساعة ${document.getElementById('hour').value}:${document.getElementById('minute').value} ${selectedSize} <span class="text-danger" style="font-size: 22px;font-weight: 800;">ما دام مسافرا</span>
        `
    }else{
        document.getElementById('endMshTime').innerHTML =`ستظهر المعلومات هنا`    
        alertify.alert()
        .setting({
            'label':'حسنا',
            'message': 'الرجاء تعبأة الخانات لحساب المدة!' 
        }).show();
    }
})

saveDataBtn.addEventListener('click', function(){
    if(!(end_msh_time() === undefined) && !(radio_button_checked() === undefined) && !(minute.value === 'الدقائق') && !(hour.value === 'الساعة') ){
        add_new_object()
        set_locale_storage()
        clear_date()
    }else{
        alertify.alert()
        .setting({
            'label':'حسنا',
            'message': 'لا يمكنك حفظ البيانات وهي غير مكتملة'
        }).show();
    }
    
})


function convertToImage() {
    let confirmToDownloadImg = confirm('هل أنت متأكد من تحميل جدول المعلومات كصورة؟')
    if(confirmToDownloadImg){
        var resultDiv = document.getElementById("result");
        html2canvas(document.getElementById("myTable"), {
            onrendered: function(canvas) {
                var img = canvas.toDataURL("image/png");
                result.innerHTML = `<a id='downloadImg' download="test.png" href="${img}" class='btn btn-info text-light' style='width: 60%;background: #cdba0c;border: none;'>اضغط هذا الزر للتحميل</a>`;
                document.getElementById('downloadImg').addEventListener('click', function(){

                    alertify.notify('تم التحميل', 'success', 4);
                })
            }
        });
        setTimeout(()=>{
            result.innerHTML = ''
        },5000)
    }
    else{
        alertify.error('تم الإلغاء'); 
    }
}        
//click event
var convertBtn = document.getElementById("convert");
convertBtn.addEventListener('click', convertToImage);


