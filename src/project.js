export { createProject };



let projectActions = {
  addTask(task) {
    this.list.push(task);
  },
  getTasks() {
    return this.list;
  },
  getName() {
    return this.name;
  },
  
};

const createProject = (name,projlist) => {
  const list = [];
  let project = Object.create(projectActions);
  project.name = name;
  project.list = projlist;

  return project;
};
