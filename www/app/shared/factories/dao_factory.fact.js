//==================================================================================
//==================================================================================
angular.module('districteuro.dao_factory', [])

.factory('DAOFactory', ['$http', 'configuration', '$q', '$cordovaSQLite', '$ionicPlatform',
  function ($http, configuration, $q, $cordovaSQLite, $ionicPlatform) {

  var self = this;

  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  self.init = function () {
      $ionicPlatform.ready(function () {
          db = window.sqlitePlugin.openDatabase({name: 'districteuro.db', location: 'default'});

          //NO funciona a partir de iOS 9.3
          /*db = $cordovaSQLite.openDB("h4e.db");*/

          $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS appointments (id integer primary key, date text, hour int, doctor_id int, doctor_name text)");
          $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS user (id integer primary key, name text, phone text, mail text, reminder integer)");
      });
  }

  //--------------------------------------------------------------------------
  // Create table with 'table' name and the list of tableColumns
  //--------------------------------------------------------------------------
  self.createTable = function (table, tableColumns) {
      var columns = [];
      for (var column in tableColumns)
          columns.push(column + " " + tableColumns[column]);

      var sql = "CREATE TABLE IF NOT EXISTS " + table + " (" + columns.join() + ")"

      return $cordovaSQLite.execute(self.db, sql);
  }

  self.query = function (query, parameters) {
      parameters = parameters || [];
      var q = $q.defer();
      $ionicPlatform.ready(function () {
          $cordovaSQLite.execute(db, query, parameters)
              .then(function (result) {
                  q.resolve(result);
              }, function (error) {
                  console.warn('Error de acceso a la base de datos');
                  console.warn(error);
                  console.info(arguments);
                  q.reject(error);
              });
      });

      return q.promise;
  }

  self.getAll = function (result) {
      var output = [];

      for (var i = 0, count = result.rows.length; i < count; i++)
          output.push(result.rows.item(i));

      return output;
  }

  self.getById = function (result) {
      return result.rows.item(0);
  }

  self.buildSQLColumns = function (objTableColumns) {
      return Object.keys(objTableColumns).join();
  }

  self.buildValueColumns = function (tableColumns, objValueColumns) {
      var value = [];

      for (var column in tableColumns)
          value.push(objValueColumns[column]);

      return value;
  }

  self.buildSQLColumnsUpdate = function (objTableColumns) {
      var columns = [];
      for (var column in objTableColumns)
          columns.push(column + " = (?)");

      return columns.join();
  }

  self.buildSQLColumnsValueInsert = function (objTableColumns) {
      var value = [];

      for (var column in objTableColumns)
          value.push("?");

      return value.join();
  }

  return self;
}]);
