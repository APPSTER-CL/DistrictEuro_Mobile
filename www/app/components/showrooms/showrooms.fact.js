angular.module('districteuro.showrooms.factories', [])

.service('ShowroomsFactory', function ($http, $q){
  this.getShowroomsLists = function(){
    var getShowrooms_deferred = $q.defer();
    $http({
      url: configuration.webApi.showrooms.get_showrooms,
      method: "GET"
    }).success(function(res, status, headers, config) {
      //TODO: Load images from the showrooms.
      var i = 0;
      angular.forEach(res.results, function(showroom) {
        i++;
        showroom.has_appointments = true;
        showroom.has_events = true;
      });
      getShowrooms_deferred.resolve(res);

    }).error(function(error, status, headers, config) {
      getShowrooms_deferred.reject({
        'error': error,
        'status': status
      });
    });
    return getShowrooms_deferred.promise;
  };

  this.getShowroom = function(showroomId){
    var getShowroom_deferred = $q.defer();
    $http({
      url: configuration.webApi.showrooms.get_showrooms + showroomId + '/',
      method: "GET"
    }).success(function(res, status, headers, config) {
      res.has_appointments = true;
      res.has_events = true;
      getShowroomEventAppointment(3).then(function(data){
        res.events = data.events;
        res.appointments = data.appointments;
        res.appointmentsSpanish = data.appointmentsSpanish;
        res.appointmentsChinese = data.appointmentsChinese;
        res.image = "./img/common/showroom_1.png";
        getShowroom_deferred.resolve(res);
      })
    }).error(function(error, status, headers, config) {
      getShowroom_deferred.reject({
        'error': error,
        'status': status
      });
    });
    return getShowroom_deferred.promise;
  };

  var getShowroomEventAppointment = function(showroomId){
    var dfd = $q.defer();
    $http.get('logged_user_db.json').success(function(database) {
      var showroom = _.find(database.user.showrooms, function(showroom){
        return showroom.id == showroomId;
      });
      dfd.resolve(showroom);
    });
    return dfd.promise;
  };
})

;
