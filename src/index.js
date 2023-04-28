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
let exitForm = document.querySelector(".formExit");

function component() {
  //onload check for information
  if (localStorage.length >= 1) {
  
    // projectContainer.appendChild(initialLoad());
    initialLoad();
    logic.setCurrentProject(localStorage.key(0));
    let current=logic.getCurrentProject();
    loadTasks(current);
  
    let projectChoice=document.querySelectorAll(".projectChoice");
    projectChoice[0].children[0].checked=true;
   
  }
}

component();

//loading the work tasks

createProjectBtn.addEventListener("click", function () {
  projectForm.style.display = "block";
  taskContainer.innerHTML = "";
});

newtaskBtn.addEventListener("click", function () {
  if (localStorage.length > 0) {
    taskForm.style.display = "flex";
}else{
  alert("Please create a project first");
}
 
});

projectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let ifExists = logic.existenceCheck(projectName.value,"project");

 if(ifExists==false)
 { projectForm.style.display = "none";
  projectContainer.appendChild(addToPane(projectName.value));
  logic.setCurrentProject(projectName.value);
  //logically create
  let tempList = [];
  let newProject = createProject(projectName.value, tempList);

  storage.storeProject(newProject, newProject.getName());
  projectForm.reset();
  }else{
    alert("insert new project name");
  }
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
 
  let ifExists = logic.existenceCheck(taskName.value,"task",);

  if(ifExists==false){
    taskForm.style.display = "none";

    let alertValue = document.getElementById("alert");
    loadAddedTask(taskName.value, alertValue.checked);

    //logically create
    let task = createTask(taskName.value);
    task.addDescription(freeform.value);
    task.setAlert(alertValue.checked);
    task.setDate(date.value);

    let currentProj = storage.getProject(logic.getCurrentProject());
    let newProj = createProject(currentProj.name, currentProj.list);

    newProj.addTask(task);

    storage.storeProject(newProj, newProj.getName());
    taskForm.reset();
  }else{
    alert("task name exists already for this project");
  }
  
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
    let index = updateTaskDiv.getAttribute("data-currentTask");

    currentProj.list[index].name = editTitle.value;
    currentProj.list[index].description = editDescription.value;
    currentProj.list[index].alert = slider.checked;

    let replacement = createProject(currentProj.name);
    replacement.setTasks(currentProj.list);

    //updated project
    storage.storeProject(replacement, replacement.getName());

    //empty tasks container and then add them back
    taskContainer.innerHTML = "";
    loadTasks(logic.getCurrentProject());
    taskForm.reset();
 
});
let taskView = document.querySelector(".taskView");
let taskBG = document.querySelector(".taskBG");
exitTask.addEventListener("click", (e) => {
  taskView.style.display = "none";
  taskBG.style.display = "none";
});

exitForm.addEventListener("click", (e) => {
  taskForm.style.display = "none";
});