export {logic};

const logic =(()=>{
//check local storage for any current information and populate the dom with it 




//keeping track of the current project that has been selected 

let currentProject=null;

const getCurrentProject=()=>{
   return currentProject;
}
const setCurrentProject=(projectName)=>{
    currentProject=projectName;
}

return{setCurrentProject,getCurrentProject,currentProject};


})();