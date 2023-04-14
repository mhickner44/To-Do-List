import { storage } from "./storeInfo.js";
import { logic } from "./logic.js";

export { addToPane };
export { loadTasks };
export { loadAddedTask };
export { initialLoad };

let taskContainer = document.querySelector(".taskContainer");
let projectContainer = document.querySelector(".projectContainer");
const initialLoad = () => {
  // let div=document.createElement("div");
  for (let i=localStorage.length; i>=0;i--) {
   let project=localStorage.key(i);
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
  let color = "white";
  if (alert == true) {
    color = "red";
  }

  taskDiv.innerHTML = `
  <div class="task">
      <i class="fa-regular fa-circle-check"></i>${projName}
      <i class="fa-solid fa-circle-exclamation" style="color:${color};"></i>
  </div>`;

  //add
  taskContainer.appendChild(taskDiv);
};
