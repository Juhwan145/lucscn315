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
