angular.module('districteuro.showrooms.services', [])

.service('ShowroomsService', function ($http, $q){
  this.getShowroomsLists = function(){
    var dfd = $q.defer();
    $http.get('logged_user_db.json').success(function(database) {
      dfd.resolve(database.user.lists);
    });
    return dfd.promise;
  };

  this.getShowroom = function(showroomId){
    var dfd = $q.defer();
    $http.get('logged_user_db.json').success(function(database) {
      var list = _.find(database.user.lists, function(list){
        return list.id == showroomId;
      });
      dfd.resolve(list);
    });

    return dfd.promise;
  };
})

;
