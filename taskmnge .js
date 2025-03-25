import { Task } from './objects.js'; // Import the Task class

// Creating an instance of Task using the `new` keyword
// Example task for Sunday Worship Setup
let task1 = new Task("Prepare Worship Slides", "Make PowerPoint for Sunday songs", "2025-03-30");

// Comment: Mark the task as completed
task1.markCompleted();

// Comment: Update task title and description
task1.updateTitle("Prepare Worship Slides & Sermon Notes");
task1.updateDescription("Slides for Sunday + Pastor's sermon points");

// Display task info on the page
const displayDiv = document.getElementById("taskDisplay");
displayDiv.innerText = task1.displayTask();
