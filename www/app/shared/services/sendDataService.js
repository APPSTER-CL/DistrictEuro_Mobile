"use strict"

angular.module('districteuro').service("sendDataService",
  function(StorageService) {
    var self = this;

    self.setProductID = function(productID) {
      StorageService.save('productID', productID);
    };

    self.getProductID = function() {
      return StorageService.get('productID');
    };



    return self;
  })
