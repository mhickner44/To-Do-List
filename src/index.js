import "./styleReset.css";
import "./style.css";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

import { createProject } from "./project.js";
import { createTask } from "./task.js";
import { storage } from "./storeInfo.js";
import { addToPane, loadTasks } from "./domController";
import { loadAddedTask } from "./domController";
import { logic } from "./logic.js";
import { initialLoad } from "./domController";

const createProjectBtn = document.querySelector(".projectCreate");
const projectContainer = document.querySelector(".projectContainer");

let projectForm = document.getElementById("newProject");
let taskForm = document.getElementById("newTask");
let newtaskBtn = document.querySelector(".taskCreation");
let currentProject = null;
let taskContainer = document.querySelector(".taskContainer");

let exitTask = document.querySelector(".exit");

function component() {
  //onload check for information
  if (localStorage.length >= 1) {
    // projectContainer.appendChild(initialLoad());
    initialLoad();
    logic.setCurrentProject(localStorage.key(0));
    loadTasks(logic.getCurrentProject());
  }
}

component();

//loading the work tasks

createProjectBtn.addEventListener("click", function () {
  projectForm.style.display = "block";
  taskContainer.innerHTML = "";
});

newtaskBtn.addEventListener("click", function () {
  taskForm.style.display = "flex";
});

projectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  projectForm.style.display = "none";
  // insertBefore(addToPane(projectName.value), projectContainer.lastChild);
  projectContainer.appendChild(addToPane(projectName.value));
  //setting the current project

  logic.setCurrentProject(projectName.value);

  //logically create
  let tempList = [];
  let newProject = createProject(projectName.value, tempList);

  storage.storeProject(newProject);
  projectForm.reset();
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  taskForm.style.display = "none";

  let alertValue = document.getElementById("alert");
  loadAddedTask(taskName.value, alertValue.checked);

  //logically create
  let task = createTask(taskName.value);
  task.addDescription(freeform.value);
  task.setAlert(alertValue.checked);
  task.setDate(date.value);


  let currentProjName = storage.getProject(logic.getCurrentProject());
  let currentProj = createProject(currentProjName.name, currentProjName.list);

  currentProj.addTask(task);

  storage.storeProject(currentProj);
  taskForm.reset();
});

let taskView = document.querySelector(".taskView");
let taskBG = document.querySelector(".taskBG");
exitTask.addEventListener("click", (e) => {
  taskView.style.display = "none";
  taskBG.style.display = "none";
});


let taskEditForm = document.getElementById("taskEdit");
let updateTaskDiv = document.querySelector(".taskView");
let slider = document.getElementById("editAlert");
let editDescription = document.getElementById("editDescription");


taskEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  taskView.style.display = "none";
  taskBG.style.display = "none";


  let currentProj = storage.getProject(logic.getCurrentProject());

  let currentIndex = updateTaskDiv.getAttribute("data-currentTask");
  let currentTask = currentProj.list[currentIndex];
  let index=updateTaskDiv.getAttribute("data-currentTask");

  currentProj.list[index].name=editTitle.value;
  currentProj.list[index].description=editDescription.value;
  currentProj.list[index].alert=slider.checked;
  
  let replacement=createProject(currentProj.name);
  replacement.setTasks(currentProj.list);
  
  //updated project
  storage.storeProject(replacement);
 
 //empty tasks container and then add them back
 taskContainer.innerHTML = "";
 loadTasks(logic.getCurrentProject());
  taskForm.reset();
   
});


