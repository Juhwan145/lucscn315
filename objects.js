// Task class to manage church-related tasks (e.g., worship team prep, event setup)
export class Task {
    // Constructor to initialize task details
    constructor(title, description, dueDate) {
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.completed = false; // Initially, task is not completed
    }
  
    // Mark the task as completed
    markCompleted() {
      this.completed = true;
    }
  
    // Update task title
    updateTitle(newTitle) {
      this.title = newTitle;
    }
  
    // Update task description
    updateDescription(newDescription) {
      this.description = newDescription;
    }
  
    // Update task due date
    updateDueDate(newDueDate) {
      this.dueDate = newDueDate;
    }
  
    // Display task information (for console/debugging)
    displayTask() {
      return `${this.title} - ${this.description} (Due: ${this.dueDate}) - ${this.completed ? "Completed" : "Incomplete"}`;
    }
  }
  
