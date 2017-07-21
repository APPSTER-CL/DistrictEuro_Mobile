angular.module('districteuro.storage_service', [

])

.service('StorageService', [function () {

  this.save = function (key, value) {
    window.localStorage[key] = value;
  };

  this.get = function(key){
    return window.localStorage[key];
  };

  this.delete = function (key) {
    window.localStorage.removeItem(key);
  };

  this.flush = function () {
    window.localStorage.clear();
  }

  return this;
}]);
