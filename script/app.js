// Check if the site has been visited before and retrieve the current count
let count = localStorage.getItem('visitCount');

// If it's the first time, set the count to 1, otherwise increment it by 1
if (count === null) {
  count = 1;
} else {
  count = parseInt(count) + 1;
}

// Store the updated count in localStorage
localStorage.setItem('visitCount', count);

// Display the count on the webpage
document.getElementById('visitors_num').innerHTML = count;