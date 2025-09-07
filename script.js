const taskInput = document.getElementById("taskInput"); // input field (jahan user task likhta hai)
const taskList = document.getElementById("taskList");   // To-Do list ka ul element
const historyList = document.getElementById("historyList"); // History log ka ul element
const addBtn = document.getElementById("addBtn"); // "Add" button

// 🌟 Page load hone par local storage se tasks wapas load karna
window.onload = function () {
  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || []; // agar tasks hain to load karo warna khaali
  savedTasks.forEach(task => createTaskElement(task.text, task.completed)); // har task ko list me dikhana
};

// 🌟 Task add karna
addBtn.addEventListener("click", addTask);

function addTask() {
  if (taskInput.value === "") { // agar input khaali hai
    alert("Please enter a task!"); // warning message
    return; // function rok do
  }
  createTaskElement(taskInput.value, false); // naya task banao
  logHistory(`Added: "${taskInput.value}"`); // history me likho k add hua
  saveTasks(); // local storage me save karo
  taskInput.value = ""; // input box ko clear kar do
}

// 🌟 Naya task element banana
function createTaskElement(text, completed) {
  let li = document.createElement("li"); // naya li banaya
  li.textContent = text; // li me task ka text likh diya

  if (completed) { // agar task completed hai
    li.classList.add("completed"); // usko completed class do
  }

  // ✅ Task ko complete/incomplete mark karne ka option
  li.addEventListener("click", function () {
    li.classList.toggle("completed"); // click karne par complete/incomplete ho jaye
    if (li.classList.contains("completed")) {
      logHistory(`Completed: "${text}"`); // history me likho k complete hua
    } else {
      logHistory(`Marked Incomplete: "${text}"`); // history me likho k incomplete hua
    }
    saveTasks(); // changes ko save karo
  });

  // ❌ Delete Button
  let delBtn = document.createElement("button"); 
  delBtn.textContent = "X"; // button ka text
  delBtn.classList.add("delete-btn"); // delete button ka CSS class
  delBtn.onclick = function (e) {
    e.stopPropagation(); // parent click event ko rokna
    li.remove(); // task ko hatao
    logHistory(`Deleted: "${text}"`); // history me likho k delete hua
    saveTasks(); // changes ko save karo
  };

  li.appendChild(delBtn); // delete button ko task ke sath jodo
  taskList.appendChild(li); // task ko ul me add karo
}

// 🌟 Tasks ko Local Storage me save karna
function saveTasks() {
  let tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.childNodes[0].nodeValue.trim(), // task ka text
      completed: li.classList.contains("completed") // completed status
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks)); // JSON me convert karke save karna
}

// 🌟 History me log karna
function logHistory(action) {
  let li = document.createElement("li"); // naya li banao
  li.textContent = action + " (" + new Date().toLocaleTimeString() + ")"; // action + current time show karo
  historyList.insertBefore(li, historyList.firstChild); // hamesha naya action upar dikhai de
}
