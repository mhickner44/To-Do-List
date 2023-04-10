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

const createProjectBtn = document.querySelector(".projectCreate");
const projectContainer = document.querySelector(".projectContainer");
const projectBtn = document.querySelector(".project");
let projectForm = document.getElementById("newProject");
let taskForm = document.getElementById("newTask");
let newtaskBtn = document.querySelector(".taskCreation");

let taskContainer = document.querySelector(".taskContainer");

function component() {
  const element = document.createElement("div");

  // ------------------------initial tasks------------------------------
  let workProject = createProject("work List");
  // let task = createTask("go to the store");
  // let task1 = createTask("clean room");
  // task.addDescription("I need to go to the store to get clothes");
  // task.setAlert();

  // workProject.addTask(task);
  // workProject.addTask(task1);

  // storage.storeProject(workProject);
  console.log(storage.getProject(workProject));
  // ------------------------load the tasks------------------------------

  // taskContainer.appendChild(loadTasks(workProject));
  loadTasks(workProject)

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
  projectForm.reset();
});

document.body.appendChild(component());

function insertBefore(newNode, existingNode) {
  existingNode.parentNode.insertBefore(newNode, existingNode);
}
