// Variable global para la db
var db = null;

angular.module('districteuro.controllers', [])

.controller('ConfigCtrl', function ($scope, $ionicPlatform, $state, $ionicHistory, DAOFactory) {

  //--------------------------------------------------------------
  //DATA BASE
  //--------------------------------------------------------------
  $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
  });
  $ionicPlatform.ready(function () {
      if (window.cordova) {
          DAOFactory.init();
      } else {
          db = openDatabase("websql.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
          db.transaction(function (tx) {
              tx.executeSql("DROP TABLE IF EXISTS appointments");

              tx.executeSql("CREATE TABLE IF NOT EXISTS appointments (id integer primary key, date text, hour int, doctor_id int, doctor_name text)");
              tx.executeSql("INSERT INTO appointments (date,hour,doctor_id,doctor_name) VALUES (?,?,?,?)", ["2016-07-12", 900, 1, "Martin Lopez"]);
              tx.executeSql("INSERT INTO appointments (date,hour,doctor_id,doctor_name) VALUES (?,?,?,?)", ["2016-07-20", 1030, 2, "Rodrigo Fernandez"]);
              tx.executeSql("INSERT INTO appointments (date,hour,doctor_id,doctor_name) VALUES (?,?,?,?)", ["2016-08-12", 1630, 1, "Martin Lopez"]);
          });
      }
      $state.go('menu.products');
  });

});
