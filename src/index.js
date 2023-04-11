import "./styleReset.css";
import "./style.css";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

import { createProject } from "./project.js";
import { createTask } from "./task.js";
import { storage } from "./storeInfo.js";
import { addToPane } from "./domController";
import { loadTasks } from "./domController";
import { logic } from "./logic.js";

const createProjectBtn = document.querySelector(".projectCreate");
const projectContainer = document.querySelector(".projectContainer");
const projectBtn = document.querySelector(".project");
let projectForm = document.getElementById("newProject");
let taskForm = document.getElementById("newTask");
let newtaskBtn = document.querySelector(".taskCreation");
let currentProject = null;
let taskContainer = document.querySelector(".taskContainer");

function component() {
  const element = document.createElement("div");
  logic.setCurrentProject("test");
  // ------------------------initial tasks------------------------------
  // let workProject = createProject("work List");

  // let task = createTask("go to the store");
  // let task1 = createTask("clean room");

  // storage.storeProject(workProject);

  // ------------------------load the tasks------------------------------

  // taskContainer.appendChild(loadTasks(workProject));
  // loadTasks(workProject)

  return element;
}

//loading the work tasks

createProjectBtn.addEventListener("click", function () {
  projectForm.style.display = "block";
});

newtaskBtn.addEventListener("click", function () {
  taskForm.style.display = "flex";
});

projectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  projectForm.style.display = "none";
  insertBefore(addToPane(projectName.value), projectContainer.lastChild);

  //logically create
  let tempList=[];
  let newProject = createProject(projectName.value,tempList);
  let task1 = createTask("clean room");
  task1.addDescription("I need to go to the store to get clothes");
  task1.setAlert();

  newProject.addTask(task1);

  storage.storeProject(newProject);
  projectForm.reset();
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  projectForm.style.display = "none";
  insertBefore(addToPane(projectName.value), projectContainer.lastChild);

  //logically create

  let task = createTask(taskName.value);
  task.addDescription(freeform.value);
  task.setAlert(alert.value);
  task.setDate(date.value);

  let currentProjName = storage.getProject(logic.getCurrentProject());

  let currentProj= createProject(currentProjName.name,currentProjName.list);
  currentProj.addTask(task);
// let proj= currentProj.getName();
  storage.storeProject(currentProj);
  taskForm.reset();
});

document.body.appendChild(component());

function insertBefore(newNode, existingNode) {
  existingNode.parentNode.insertBefore(newNode, existingNode);
}
