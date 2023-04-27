export { logic };
import { storage } from "./storeInfo.js";

const logic = (() => {
  let currentProject = null;

  const getCurrentProject = () => {
    return currentProject;
  };
  const setCurrentProject = (projectName) => {
    currentProject = projectName;
  };

  const existenceCheck = (name, type) => {
    let existence = false;

    if (type == "project") {
      for (let i = 0, len = localStorage.length; i < len; ++i) {
        if (name == localStorage.key(i)) {
          console.log("duplicate");
          existence = true;
        }
      }
    }

    if (type == "task") {
      let project = storage.getProject(logic.getCurrentProject());
      //use the project to find the current task
      //this would always be the last
      //just need name and type to loop through if this task exists
      for (let i = 0; i < project.list.length; i++) {
        if (name === project.list[i].name){
          existence = true;
          console.log("i ran");
        }
      }

      //loop through project
    }

    return existence;
  };

  return {
    setCurrentProject,
    getCurrentProject,
    currentProject,
    existenceCheck,
  };
})();
