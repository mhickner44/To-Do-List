export { createProject };

// -get
// -tasks
// -name
// -set
// -name

// -add
// -tasks

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

const createProject = (name) => {
  const list = [];
  let project = Object.create(projectActions);
  project.name = name;
  project.list=list;
 
  return project;
};
