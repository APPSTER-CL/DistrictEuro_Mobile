angular.module('districteuro.account.services', [

])

.service('OrderService', function ($http, $q, FashionService){

  this.getUserOrders = function(){
    var dfd = $q.defer();
    var service = this;

    $http.get('logged_user_db.json').success(function(database) {
      var orders = _.each(database.user.orders, function(order){
        service.getOrderProducts(order).then(function(products){
          order.products = products;
        }, function(error){
          console.log("ups", error);
        });
      });

      dfd.resolve(orders);
    });
    return dfd.promise;
  };

  this.getOrderProducts = function(order){
    var dfd = $q.defer();

    var promises = [];
    order.products.forEach(function(product) {
      var def = $q.defer();
			def.resolve(FashionService.getProduct(product.id));
      promises.push(def.promise);
    });

    dfd.resolve($q.all(promises));

    return dfd.promise;
  };

})


.service('ProfileService', function ($http, $q){
  this.getUserData = function(){
    var dfd = $q.defer();
    $http.get('logged_user_db.json').success(function(database) {
      dfd.resolve(database.user);
    });
    return dfd.promise;
  };
})

.service('PurchasesService', function ($http, $q, FashionService){
  this.getUserPurchases = function(){
    var dfd = $q.defer();

    $http.get('logged_user_db.json').success(function(database) {

      var purchases = _.each(database.user.purchases, function(purchase){
        FashionService.getProduct(purchase.product_id).then(function(response) {
          purchase.product = response;
        }, function(error){
          console.log("ups", error);
        });
      });

      dfd.resolve(purchases);
    });
    return dfd.promise;
  };
})

.service('StoresService', function ($http, $q, TravelService){
  this.getUserStores = function(){
    var dfd = $q.defer();

    $http.get('logged_user_db.json').success(function(database) {
      var stores = _.each(database.user.stores, function(store){
        TravelService.getStoreDetail(store.id).then(function(response){
          store = response;
        }, function(error){
          console.log("ups", error);
        });
      });
      dfd.resolve(stores);
    });
    return dfd.promise;
  };
})

.service('PointsService', function ($http, $q){
  this.getUserPoints = function(){
    var dfd = $q.defer();
    $http.get('logged_user_db.json').success(function(database) {
      dfd.resolve(database.user.points);
    });
    return dfd.promise;
  };
})

.service("AppointmentsService", function(StorageService) {

    var handler = {
      appintments_metadata_key: 'appintments_metadata',
      default_metadata: {
          id: 0,
          keys: []
        },
      appointment_prefix: 'appointment_',
      _getMeta: function() {
        var meta;
        try {
          var meta = StorageService.get(this.appintments_metadata_key);
          if (meta) {
            meta = JSON.parse(meta);
          }
        } catch(err) {
          meta = this.default_metadata;
        }
        return meta;
      },
      _getKeys:function() {
        return this._getMeta().keys;
      },
      _incrementKey: function() {
        var meta = this._getMeta();
        var new_key = ++meta.id;
        meta.keys.push(new_key);
        StorageService.save(this.appintments_metadata_key, JSON.stringify(meta));
        return new_key;
      },
      _deleteKey: function(key) {
        var meta = this._getMeta();
        var index = meta.keys.indexOf(key);
        meta.keys.splice(index, 1);
        StorageService.save(this.appintments_metadata_key, JSON.stringify(meta));
      },
      _makeKey: function (appointment_id) {
        return this.appointment_prefix + appointment_id.toString();
      },
      init: function() {
        var metadata = StorageService.get(this.appintments_metadata_key);

          // Check consistency
        var inconsistent = false;
        var handler = this;
        try {
          if (metadata) {
            metadata = JSON.parse(metadata);
          }
          if (!metadata || metadata.keys === undefined || metadata.id === undefined ||
            metadata.keys.some(function(id) { return id > metadata.id;}) ||
            metadata.keys.some(function(id) { return handler.getAppointment(id) === undefined;}))
          {
            inconsistent = true;
          }
        } catch(err) {
          inconsistent = true;
        }
        if (inconsistent) {
          StorageService.save(this.appintments_metadata_key,
            JSON.stringify(this.default_metadata));
        }
      },
      getAppointment: function(appintment_id) {
        var data = StorageService.get(this._makeKey(appintment_id));
        if (data) {
          data = JSON.parse(data);
        }
        return data;
      },
      eachAppointment: function(callback) {
        var self = this;
        self._getKeys().forEach(function(appintment_id, index) {
          if (callback)
            callback(self.getAppointment(appintment_id), index);
        });
      },
      save: function(data) {
        data.id = this._incrementKey();
        StorageService.save(this._makeKey(data.id), JSON.stringify(data));
        return data;
      },
      delete: function(appointment_id){
        StorageService.delete(this._makeKey(appointment_id));
        this._deleteKey(appointment_id);
      }
    };

    handler.init();

    var self = this;


    self.getAppointments = function() {
      var appointments = [];
      handler.eachAppointment(function(appointment) {
        appointments.push(appointment);
      });
      return appointments;
    };

    self.getAppointment = function(appintment_id) {
      return handler.getAppintment(appintment_id);
    };

    self.saveAppointment = function(appointment_data) {
      handler.save(appointment_data);
    };

    self.deleteAppointment = function(appointment_id){

      handler.delete(appointment_id);
      self.getAppointments();
    }

    return self;
  })


;
