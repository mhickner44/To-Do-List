import "./styleReset.css";
import "./style.css";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

import {createProject} from "./project.js";
import {createTask} from "./task.js";
import {storage} from "./storeInfo.js";

const createProjectBtn= document.querySelector("projectCreate");

function component() {
  const element = document.createElement("div");

  // Lodash, currently included via a script, is required for this line to work
  let workProject = createProject("work List");
  let task= createTask("go to the store");
  let task1= createTask("clean room");
  task.addDescription("I need to go to the store to get clothes");
  task.setAlert();


  workProject.addTask(task);
  workProject.addTask(task1);

  storage.storeProject(workProject);
  console.log(storage.getProject(workProject));

  return element;
}


createProjectBtn.addEventListener("click",function(){
    
});





document.body.appendChild(component());
