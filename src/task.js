export { createTask };

// -get
// -tasks
// -name
// -set
// -name

// -add
// -tasks

let taskActions = {
  addDescription(description) {
    this.description = description;
  },
  completeTask() {
    this.status = true;
  },
  setAlert() {
    this.alert = true;
  },
  removeAlert(){
    this.alert=false;
  },
  getTasks() {
    return this;
  },
};

const createTask = (name) => {
  let task = Object.create(taskActions);

  let dueDate = new Date();
  let currentDate = dueDate.getDate();
  currentDate = currentDate + 7;
  dueDate.setDate(currentDate);

  task.name = name;
  task.status = false;
  task.alert = false;
  task.dueDate = dueDate;

  return task;
};
