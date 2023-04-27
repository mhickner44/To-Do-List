
export { storage };

Storage.prototype.setObject = function (key, value) {
  this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function (key) {
  return JSON.parse(this.getItem(key));
};


const storage = (() => {
  const storeProject = (project,name) => {
    localStorage.setObject(name, project);
  };

  const getProject = (project) => {
    return localStorage.getObject(project);
  };

  const getStorage = () => {
    return localStorage.getStorage();
  };
  const removeTask = (project, task) => {
    project.list.splice(task, 1);
    storeProject(project,project.name);
  };

  return { storeProject, getProject,  removeTask };
})();
