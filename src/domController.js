import { storage } from "./storeInfo.js";
import { logic } from "./logic.js";

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
  // let div=document.createElement("div");
  // for (let i=localStorage.length; i>=0;i--) {
  for (let i = 0; i <= localStorage.length; i++) {
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

  //icon creation
  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-bars");

  const input = document.createElement("input");

  input.type = "radio";
  input.id = projectName;
  input.name = "options";
  input.checked = true;

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

  for (let i in information.list) {
    const taskDiv = document.createElement("div");

    if (information.list[i].alert != true) {
      taskDiv.innerHTML = `
      <div class="task">
          <i class="fa-regular fa-circle-check"></i>${information.list[i].name}
          <i class="fa-solid fa-circle-exclamation" style="color:white;"></i>
      </div>`;
    } else {
      taskDiv.innerHTML = `
      <div class="task">
          <i class="fa-regular fa-circle-check"></i>${information.list[i].name}
          <i class="fa-solid fa-circle-exclamation"></i>
      </div>`;
    }

    taskContainer.appendChild(taskDiv);
  }

  return taskContainer;
};

const loadAddedTask = (projName, alert) => {
  const taskDiv = document.createElement("div");
  // ------------------------------------------------------------------------

  let color = "white";
  if (alert == true) {
    color = "red";
  }

  taskDiv.innerHTML = `
  <div class="task">
      <i class="fa-regular fa-circle-check"></i>${projName}
      <i class="fa-solid fa-circle-exclamation" style="color:${color};"></i>
  </div>`;
  taskDiv.addEventListener("click", openTask);
  //add
  taskContainer.appendChild(taskDiv);
};

let taskInput = document.getElementById("editTitle");
let description = document.getElementById("editDescription");
let date = document.getElementById("editDate");
let slider = document.getElementById("editAlert");
// ----------------------------fill in the task pane--------------------------------------------
function openTask() {
  

  // this. get the task name of the current project

  let currentTask = this.textContent;
  currentTask = currentTask.replaceAll(/\n/g, "");

  //set attribute for the name so I can find it when I make changes
  

  let currentProj = storage.getProject(logic.getCurrentProject());

  let index = Array.prototype.indexOf.call(this.parentNode.children, this);
  
  taskView.setAttribute("data-currentTask", index);

  taskInput.value = currentProj.list[index].name
  description.value = currentProj.list[index].description;
  // slider.value
  let updateDate = currentProj.list[index].dueDate;
  date.value =updateDate.substring(0, 10);

  taskView.style.display = "flex";
  taskBG.style.display = "block";
}

