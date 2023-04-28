import { storage } from "./storeInfo.js";
import { logic } from "./logic.js";
import { createProject } from "./project.js";
import { removeTask } from "./storeInfo.js";

export { addToPane };
export { loadTasks };
export { loadAddedTask };
export { initialLoad };

let taskContainer = document.querySelector(".taskContainer");
let projectContainer = document.querySelector(".projectContainer");
let body = document.querySelector("body");

let taskView = document.querySelector(".taskView");
let taskBG = document.querySelector(".taskBG");

const initialLoad = () => {

  for (let i = 0; i < localStorage.length; i++) {
    let project = localStorage.key(i);
    projectContainer.appendChild(addToPane(project));
  }
  return projectContainer;
};

const addToPane = (projectName) => {
  const projectDiv = document.createElement("div");
  projectDiv.classList.add("projectChoice");

  const projectLabel = document.createElement("label");
  projectLabel.classList = "project";
  projectLabel.htmlFor = projectName;
  projectLabel.textContent = projectName;
  projectLabel.setAttribute("data-name", projectName);

  
  const icon = document.createElement("i");
  icon.classList.add("fa-solid" );
  icon.classList.add("fa-bars");

  

  const input = document.createElement("input");

  input.type = "radio";
  input.id = projectName;
  input.name = "options";
  input.checked = true;
  projectDiv.appendChild(icon);
  projectDiv.appendChild(input);
  projectDiv.appendChild(projectLabel);

  projectLabel.addEventListener("click", function () {
    // i need to get the project itself with a function
    taskContainer.innerHTML = "";
    loadTasks(this.getAttribute("data-name"));
    logic.setCurrentProject(this.getAttribute("data-name"));
  });

  return projectDiv;
};

const loadTasks = (project) => {
  let information = storage.getProject(project);
  let alertIcon = "";
  let complete = "";
 
  let color = "white";

  for (let i in information.list) {
    if (information.list[i].alert == true) {
      //add the id to the html in a value
      color = "red";
    }

    if (information.list[i].status == true) {
      //add the id to the html in a value
      complete = `selected`;
    }
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    taskDiv.innerHTML = `
    <p  class=${complete}>${information.list[i].name}</p><div class="icons"><i class="fa-solid fa-circle-exclamation" style="color:${color};">
    </i><span><i class="fa-solid fa-pen-to-square"></i></span><span><i class="fa-solid fa-trash"></i></span></div>
     `;
    color = "white";
    complete="";
    taskDiv.children[0].addEventListener("click", completeTask);
    taskDiv.children[1].children[1].addEventListener("click", openTask);
    taskDiv.children[1].children[2].addEventListener("click", deleteTask);
    //add
    taskContainer.appendChild(taskDiv);
  }

  return taskContainer;
};

const loadAddedTask = (projName, alert) => {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  // ------------------------------------------------------------------------

  let color = "white";
  if (alert == true) {
    color = "red";
  }

  

  taskDiv.innerHTML = `
  <p >${projName}</p><div class="icons"><i class="fa-solid fa-circle-exclamation" style="color:${color};"></i>
  <span><i class="fa-solid fa-pen-to-square"></i></span><span><i class="fa-solid fa-trash"></i></span></div>
`;

  taskDiv.children[0].addEventListener("click", completeTask);
  taskDiv.children[1].children[1].addEventListener("click", openTask);
  taskDiv.children[1].children[2].addEventListener("click", deleteTask);
  //add
  taskContainer.appendChild(taskDiv);
};

function completeTask() {
  this.classList.toggle("selected");
  let currentProj = storage.getProject(logic.getCurrentProject());

  currentProj;
  let index = Array.prototype.indexOf.call(
    this.parentNode.parentNode.children,
    this.parentNode
  );

  if (this.classList == "selected") {
    currentProj.list[index].status = true;
  } else {
    currentProj.list[index].status = false;
  }

  let replacement = createProject(currentProj.name);
  replacement.setTasks(currentProj.list);

  storage.storeProject(replacement, replacement.getName());
}

let taskInput = document.getElementById("editTitle");
let description = document.getElementById("editDescription");
let date = document.getElementById("editDate");
let slider = document.getElementById("editAlert");

function openTask() {
  // let currentTask = this.nextElementSibling.textContent;

  let currentProj = storage.getProject(logic.getCurrentProject());

  let index = Array.prototype.indexOf.call(
    taskContainer.children,
    this.parentNode.parentNode
  );

  taskView.setAttribute("data-currentTask", index);

  taskInput.value = currentProj.list[index].name;
  description.value = currentProj.list[index].description;

  let updateDate = currentProj.list[index].dueDate;
  slider.checked = currentProj.list[index].alert;

  date.value = updateDate.substring(0, 10);

  taskView.style.display = "flex";
  taskBG.style.display = "block";
}

function deleteTask() {
  let currentProj = storage.getProject(logic.getCurrentProject());

  let index = Array.prototype.indexOf.call(
    taskContainer.children,
    this.parentNode.parentNode
  );

  taskContainer.innerHTML = "";
  storage.removeTask(currentProj, index);
  loadTasks(currentProj.name);
}
