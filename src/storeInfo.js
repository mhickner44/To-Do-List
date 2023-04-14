export { storage };

Storage.prototype.setObject = function (key, value) {
  this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function (key) {
  return JSON.parse(this.getItem(key));
};
Storage.prototype.getStorage = function (key) {
  return JSON.parse(this.JSON);
};

const storage = (() => {
  

  const storeProject = (project) => {
    localStorage.setObject(project.getName(), project);
  };

  const getProject = (project) => {
    return  localStorage.getObject(project);
  };

  const getStorage = () => {
    return  localStorage.getStorage();
  };


  return {storeProject,getProject,getStorage};
})();
