angular.module('districteuro.auth.services', [])

.service('AuthService', function ($http, $q, StorageService){

  this.getLoggedUser = function(){
    var dfd = $q.defer();
    $http.get('logged_user_db.json').success(function(database) {
      dfd.resolve(database.user);
    });
    return dfd.promise;
  };

  this.isAuthenticated = function(){
    return !!StorageService.get(configuration.storage.user);
  };
})

;
