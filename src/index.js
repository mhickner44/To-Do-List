import "./styleReset.css";
import "./style.css";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

import {createProject} from "./project.js";

function component() {
  const element = document.createElement("div");

  // Lodash, currently included via a script, is required for this line to work
  let workTasks = createProject("work List");
  workTasks.addTask("task1");
  console.log(workTasks.getTasks());

  return element;
}

document.body.appendChild(component());
