export {logic};

const logic =(()=>{


let currentProject=null;

const getCurrentProject=()=>{
   return currentProject;
}
const setCurrentProject=(projectName)=>{
    currentProject=projectName;
}

return{setCurrentProject,getCurrentProject,currentProject};


})();