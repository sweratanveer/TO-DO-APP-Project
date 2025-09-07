const taskInput = document.getElementById("taskInput"); // Input field (where user types the task)
const taskList = document.getElementById("taskList");   // To-Do list UL element
const historyList = document.getElementById("historyList"); // History log UL element
const addBtn = document.getElementById("addBtn"); // "Add" button

//  Load tasks from local storage when the page loads
window.onload = function () {
  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || []; // Load tasks if available, otherwise empty
  savedTasks.forEach(task => createTaskElement(task.text, task.completed)); // Display each task in the list
};

//  Add a new task
addBtn.addEventListener("click", addTask);

function addTask() {
  if (taskInput.value === "") { // If input is empty
    alert("Please enter a task!"); // Show warning message
    return; // Stop the function
  }
  createTaskElement(taskInput.value, false); // Create a new task
  logHistory(`Added: "${taskInput.value}"`); // Log the addition in history
  saveTasks(); // Save tasks to local storage
  taskInput.value = ""; // Clear input box
}

//  Create a new task element
function createTaskElement(text, completed) {
  let li = document.createElement("li"); // Create a new <li>
  li.textContent = text; // Set task text

  if (completed) { // If task is completed
    li.classList.add("completed"); // Add completed class
  }

  //  Toggle task complete/incomplete
  li.addEventListener("click", function () {
    li.classList.toggle("completed"); // Toggle between complete/incomplete
    if (li.classList.contains("completed")) {
      logHistory(`Completed: "${text}"`); // Log completion
    } else {
      logHistory(`Marked Incomplete: "${text}"`); // Log marked incomplete
    }
    saveTasks(); // Save changes
  });

  //  Delete Button
  let delBtn = document.createElement("button"); 
  delBtn.textContent = "X"; // Button text
  delBtn.classList.add("delete-btn"); // Add CSS class for delete button
  delBtn.onclick = function (e) {
    e.stopPropagation(); // Prevent parent click event
    li.remove(); // Remove task
    logHistory(`Deleted: "${text}"`); // Log deletion
    saveTasks(); // Save changes
  };

  li.appendChild(delBtn); // Attach delete button to the task
  taskList.appendChild(li); // Add task to the list
}

//  Save tasks to Local Storage
function saveTasks() {
  let tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.childNodes[0].nodeValue.trim(), // Task text
      completed: li.classList.contains("completed") // Completed status
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Save as JSON in local storage
}

//  Log actions in history
function logHistory(action) {
  let li = document.createElement("li"); // Create a new <li>
  li.textContent = action + " (" + new Date().toLocaleTimeString() + ")"; // Show action + current time
  historyList.insertBefore(li, historyList.firstChild); // Always show latest action at the top
}
