// script.js - JavaScript Example for Changing Text

function changeText() {
    // Declare a variable
    let message = "God Bless You!";

    // Get the element by ID
    let welcomeText = document.getElementById("welcome-text");

    // Change the text
    welcomeText.innerText = message;

    // Apply JS styling
    welcomeText.style.color = "green";

    // Show an alert
    alert("You clicked the button! The text has changed.");
}

$(document).ready(function () {
    let index = 0;
    const slides = $('.slide');
    function showSlide() {
      slides.hide();
      index = (index + 1) % slides.length;
      slides.eq(index).fadeIn(1000);
    }
    showSlide();
    setInterval(showSlide, 3000);
  });
  
