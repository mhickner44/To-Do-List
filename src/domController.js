export { addToPane };


const addToPane = (projectName) => {
  const projectDiv = document.createElement("div");

  projectDiv.innerHTML = `<div class="project"><i class="fa-solid fa-bars"></i>${projectName}</div>`;
 
  return projectDiv;
};




