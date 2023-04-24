export { createTask };

let taskActions = {
  addDescription(description) {
    this.description = description;
  },
  setStatus(status) {
    if (status == true) {
      this.status = true;
    } else {
      this.status = false;
    }
  },
  setAlert(value) {
    if (value == true) {
      this.alert = true;
    } else {
      this.alert = false;
    }
  },
  removeAlert() {
    this.alert = false;
  },
  getTasks() {
    return this;
  },
  setDate(date) {
    this.date = date;
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
