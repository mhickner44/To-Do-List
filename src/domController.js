import { storage } from "./storeInfo.js";
export { addToPane };
export { loadTasks };

let taskContainer = document.querySelector(".taskContainer");

const addToPane = (projectName) => {
  const projectDiv = document.createElement("button");
  projectDiv.classList = "project";
  projectDiv.innerHTML = `<i class="fa-solid fa-bars"></i>${projectName}`;

  //get project and display event
  projectDiv.addEventListener("click", function () {
    // loadTasks(this.innerText);
    
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
