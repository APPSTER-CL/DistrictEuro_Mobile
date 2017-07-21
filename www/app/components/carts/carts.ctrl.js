angular.module('districteuro.shopping-cart.controllers', [])

.controller('CartsCtrl', function($scope, $state, $rootScope, $ionicActionSheet, products, ShoppingCartService) {

  $scope.products = products;

  $scope.$on('cart_updated', function(event, cart_products) {
    $scope.products = cart_products;
  });

  $scope.close = function() {
    $state.go('main.app.feed.fashion');
  };
})

.controller('ShoppingCartCtrl', function($scope, $state, $rootScope, $ionicActionSheet, products, ShoppingCartService) {

  $scope.products = products;
  var tax = 0.07;

  $scope.$on('cart_updated', function(event, cart_products) {
    $scope.products = cart_products;
  });

  $scope.close = function() {
    $state.go('main.app.feed.fashion');
  };

  $scope.removeFromCart = function(product) {
    $ionicActionSheet.show({
      titleText: 'Remove product from Buy Cart',
      destructiveText: 'Remove from cart',
      cancelText: 'Cancel',
      cancel: function() {
        return true;
      },
      destructiveButtonClicked: function() {
        ShoppingCartService.removeProduct(product);
        return true;
      }
    });
  };

  //update product quantities
  $scope.$watch('subtotal', function() {
    var updatedProducts = $scope.products;
    ShoppingCartService.updatedProducts(updatedProducts);
  });


  $scope.getSubtotal = function() {
    $scope.subtotal = _.reduce($scope.products, function(memo, product) {
      return memo + (product.price_amount * product.qty);
    }, 0);

    return $scope.subtotal;
  };

  $scope.getTax = function() {
    $scope.tax = $scope.subtotal * tax;
    return $scope.tax;
  };

  $scope.getTotal = function() {
    return $scope.subtotal + $scope.tax;
  };
})


.controller('TryCartCtrl', function($scope, $state, $rootScope, $ionicActionSheet, products, TryCartService,
  $ionicPopover, user_shipping_addresses, $ionicLoading, $ionicPopup, AppointmentsService, ionicTimePicker, $translate) {

  $scope.products = products;
  $scope.appointments = AppointmentsService.getAppointments();

  $scope.$on('trycart_updated', function(event, cart_products) {
    $scope.products = cart_products;
  });

  $scope.close = function() {
    $state.go('main.app.feed.fashion');
  };

  $scope.scheduleAppointment = function() {
    if (products && products.length > 0) {
      $state.go('main.app.scheduleAppointment');
    }
  };


  var initial_value = 10 * 60 * 60;

 $scope.openTimePicker = function() {
   ionicTimePicker.openTimePicker({
     callback: function (val) {
       if (typeof (val) !== 'undefined') {
         initial_value = val;
         $scope.data.time = new Date((val + new Date().getTimezoneOffset() * 60) * 1000);
       }
     },
     inputTime: initial_value,
     format: 24,
     step: 30,
     setLabel: $translate.instant('SET'),
     closeLabel: $translate.instant('CLOSE')
  });
 }


  $scope.createAppointment = function() {
    var appointment = {
      products: products,
      id: $scope.data.id,
      showroom: $scope.data.selected_address,
      date: $scope.data.date,
      time: $scope.data.time
    };
    AppointmentsService.saveAppointment(appointment);
    products.forEach(TryCartService.removeProduct);
    $state.go('main.app.checkout.thanks');
  };

  $scope.removeFromCart = function(product) {
    $ionicActionSheet.show({
      titleText: 'Remove product from Try on Cart',
      destructiveText: 'Remove from cart',
      cancelText: 'Cancel',
      cancel: function() {
        return true;
      },
      destructiveButtonClicked: function() {
        var delete_index = products.findIndex(function(obj) {
          return obj.id == product.id;
        });
        products.splice(delete_index, 1);
        TryCartService.removeProduct(product);
        return true;
      }
    });
  };

  $ionicPopover.fromTemplateUrl('views/components/checkout/partials/showroom-chooser-popover.tpl.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.addresses_popover = popover;
  });
  $scope.openShowroomPopover = function($event) {
    $scope.addresses_popover.show($event);
  };
  $scope.selectShowroom = function(address) {
    $scope.addresses_popover.hide();
  };
  $scope.closeShowroomPopup = function() {
    $scope.addresses_popover.hide();
  }

  $scope.cancel = function() {
    var previous_view = _.last($rootScope.previousView);
    $state.go(previous_view.fromState, previous_view.fromParams);
  };

  $scope.user_shipping_addresses = user_shipping_addresses;
  $scope.data = {
    selected_address: null,
    id: null,
    date: null,
    time: null
  };

  $scope.selectShowroom = function(address) {
    $scope.addresses_popover.hide();
  };

  $scope.saveSelectedAddress = function(address) {
    CheckoutService.saveUserSelectedAddress(address);
    $scope.cancel();
  };

  $scope.openAddressesPopover = function($event) {
    console.log("opening addresses popover");
    $scope.addresses_popover.show($event);
  };


  $scope.closeShippingAddressPopup = function() {
    $scope.addresses_popover.hide();
  };

  $scope.showShowroomPopup = function() {
    $scope.selectShowroomPopup = $ionicPopup.show({
      cssClass: 'popup-outer new-shipping-address-view',
      templateUrl: 'views/components/checkout/partials/showroom-chooser-popover.tpl.html',
      title: 'Select Showroom',
      scope: $scope,
      buttons: [{
        text: 'Select',
        onTap: function(e) {
          return $scope.data;
        }
      }]
    });
    $scope.selectShowroomPopup.then(function(res) {
      if (res) {
        console.log('hacer algo cuando apreta ADD con los datos llenos')
      } else {}
    });
  }

})

.controller('FavoritesCtrl', function($scope, $state, $rootScope, $ionicActionSheet, products, FavoritesService, ShoppingCartService) {

  $scope.products = products;

  $scope.$on('favorites_updated', function(event, cart_products) {
    $scope.products = cart_products;
  });

  $scope.close = function() {
    $state.go('main.app.feed.fashion');
  };

  $scope.removeFromCart = function(product) {
    $ionicActionSheet.show({
      titleText: 'Remove product from Favorites',
      destructiveText: 'Remove from list',
      cancelText: 'Cancel',
      cancel: function() {
        return true;
      },
      destructiveButtonClicked: function() {
        FavoritesService.removeProduct(product);
        return true;
      }
    });
  };

  $scope.addAllToCart = function() {
    angular.forEach($scope.products, function(value, key) {
      ShoppingCartService.addProduct(value);
			FavoritesService.removeProduct(value);
    });
		$scope.products = [];
		$state.go("main.app.carts.shopping-cart");
  };
})

;
