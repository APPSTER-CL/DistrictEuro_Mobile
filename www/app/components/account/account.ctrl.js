angular.module('districteuro.account.controllers', [])


.controller('AccountCtrl', function($scope,  $ionicScrollDelegate, ShoppingCartService, TryCartService, $ionicActionSheet, $state, AuthFactory, $translate) {
  $scope.getProductsInCart = function(){
      return ShoppingCartService.getProducts().length;
  };

  $scope.getProductsInTryCart = function(){
      return TryCartService.getProducts().length;
  };

  $scope.logout = function(){
    $ionicActionSheet.show({
      titleText: $translate.instant('LOGOUT_ARE_YOU_SURE'),
      destructiveText: $translate.instant('LOGOUT_CONFIRM'),
      cancelText: $translate.instant('LOGOUT_CANCEL'),
      cancel: function() {
        return true;
      },
      destructiveButtonClicked: function() {
        AuthFactory.logout();
      }
    });
  };
})

.controller('ProfileCtrl', function($scope, user, $ionicPopover, $rootScope, $ionicPopup, $ionicActionSheet, $state) {
  $scope.goBack = function() {
    var previous_view = _.last($rootScope.previousView);
    $state.go(previous_view.fromState, previous_view.fromParams );
  };

  $scope.user = user;

  $scope.user_credit_cards = user.credit_cards;
  $scope.user_shipping_addresses = user.shipping_addresses;
  $scope.data = {};
  $scope.data.selected_card = user.credit_cards[0];
  $scope.data.selected_address = user.shipping_addresses[0];

  $scope.user.name = user.first_name +' '+ user.last_name;
  $scope.user.password = 'asapadmin';
  $scope.show_new_address_button = true;
  $scope.show_new_card_button = true;

  $ionicPopover.fromTemplateUrl('views/components/checkout/partials/address-chooser-popover.tpl.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.addresses_popover = popover;
  });

  $ionicPopover.fromTemplateUrl('views/components/checkout/partials/card-chooser-popover.tpl.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.cards_popover = popover;
  });

  $scope.openAddressesPopover = function($event){
    $scope.addresses_popover.show($event);
  };
  $scope.selectShippingAddress = function(address){
    $scope.addresses_popover.hide();
  };
  $scope.closeShippingAddressPopup = function(){
    $scope.addresses_popover.hide();
    if($scope.editAddressPopup)
      $scope.editAddressPopup.close();
    if($scope.newAddressPopup)
      $scope.newAddressPopup.close();
  }

  $scope.openCardsPopover = function($event){
    $scope.cards_popover.show($event);
  };
  $scope.selectCreditCard = function(card){
    $scope.cards_popover.hide();
  };
  $scope.closeCreditCardPopup = function(){
    $scope.cards_popover.hide();
    if($scope.editCardPopup)
      $scope.editCardPopup.close();
    if($scope.newCardPopup)
      $scope.newCardPopup.close();
  }

  $scope.showEditCardPopup = function(card) {
    $scope.card = card;

    $scope.editCardPopup = $ionicPopup.show({
      cssClass: 'popup-outer edit-card-view',
      templateUrl: 'views/components/checkout/partials/edit-card-popup.tpl.html',
      title: '**** ' + card.number.slice(-4),
      scope: $scope,
      buttons: [
        {
          text: 'Save',
          onTap: function(e) {
            // return $scope.data;
          }
        }
      ]
    });
    $scope.editCardPopup.then(function(res) {
      if(res)
      {
        console.log('hacer algo cuando apreta ADD con los datos llenos')
      }
      else {}
    });
  };

  $scope.showEditAddressPopup = function(address) {
    $scope.address = address;

    $scope.editAddressPopup = $ionicPopup.show({
      cssClass: 'popup-outer edit-shipping-address-view',
      templateUrl: 'views/components/checkout/partials/edit-shipping-address-popup.tpl.html',
      title: address.street,
      scope: $scope,
      buttons: [
        {
          text: 'Save',
          onTap: function(e) {
            // return $scope.data;
          }
        }
      ]
    });
    $scope.editAddressPopup.then(function(res) {
      if(res)
      {
        console.log('hacer algo cuando apreta ADD con los datos llenos')
      }
      else {}
    });
  };

  $scope.showNewCardPopup = function() {
    $scope.newCardPopup = $ionicPopup.show({
      cssClass: 'popup-outer new-card-view',
      templateUrl: 'views/components/checkout/partials/new-card-popup.tpl.html',
      title: 'New Card',
      scope: $scope,
      buttons: [
        {
          text: 'Add',
          onTap: function(e) {
            // return $scope.data;
          }
        }
      ]
    });
    $scope.newCardPopup.then(function(res) {
      if(res)
      {
				console.log('hacer algo cuando apreta ADD con los datos llenos')
      }
      else {}
    });
  };

  $scope.showNewAddressPopup = function() {
    $scope.newAddressPopup = $ionicPopup.show({
      cssClass: 'popup-outer new-shipping-address-view',
      templateUrl: 'views/components/checkout/partials/new-shipping-address-popup.tpl.html',
      title: 'New Address',
      scope: $scope,
      buttons: [
        {
          text: 'Add',
          onTap: function(e) {
            // return $scope.data;
          }
        }
      ]
    });
    $scope.newAddressPopup.then(function(res) {
      if(res)
      {
				console.log('hacer algo cuando apreta ADD con los datos llenos')
      }
      else {}
    });
  };
})

.controller('PurchasesReviewCtrl', function($scope, purchases, $ionicPopover, $rootScope, $ionicPopup, $ionicActionSheet, $state) {
  $scope.goBack = function() {
    var previous_view = _.last($rootScope.previousView);
    $state.go(previous_view.fromState, previous_view.fromParams );
  };

  $scope.purchases = purchases;
})

.controller('ReviewCtrl', function($scope, product, $ionicPopover, $rootScope, $ionicLoading,$ionicPopup, $ionicActionSheet, $state, $translate) {
  $scope.goBack = function() {
    var previous_view = _.last($rootScope.previousView);
    $state.go(previous_view.fromState, previous_view.fromParams );
  };

  $scope.productReview = {
    "score": 3,
    "comment": null
  }

  $scope.product = product;

  $scope.save_review = function(){
    $ionicLoading.show({
            template: $translate('REVIEW_THANKS'),
            duration: 1000
        });
    $scope.goBack();
  }

})

.controller('OrdersCtrl', function($scope, OrderService, $rootScope, $state) {
  $scope.goBack = function() {
    var previous_view = _.last($rootScope.previousView);
    $state.go(previous_view.fromState, previous_view.fromParams );
  };
  $scope.orders = [];

  OrderService.getUserOrders().then(function(orders) {
    $scope.orders = orders;
  });
})

.controller('MyPointsCtrl', function($scope, points, $ionicPopover, $rootScope, $ionicPopup, $ionicActionSheet, $state) {
  $scope.goBack = function() {
    var previous_view = _.last($rootScope.previousView);
    $state.go(previous_view.fromState, previous_view.fromParams );
  };

  $scope.points = points;
})

.controller('MyAppointmentCtrl', function($scope, $translate,appointments, $ionicPopover, $rootScope, $ionicPopup, $ionicActionSheet, $state, AppointmentsService) {
  $scope.goBack = function() {
    var previous_view = _.last($rootScope.previousView);
    $state.go(previous_view.fromState, previous_view.fromParams );
  };
  $scope.appointments = appointments;

  $scope.deleteAppointment = function(appointment) {
      $ionicActionSheet.show({
        titleText:  $translate.instant('CANCEL_APPTMT'),
        destructiveText:  $translate.instant('YES_CANCEL'),
        cancelText: $translate.instant('NO_CANCEL'),
        cancel: function() {
          return true;
        },
        destructiveButtonClicked: function() {
          AppointmentsService.deleteAppointment(appointment.id);
          $scope.appointments = AppointmentsService.getAppointments();
          return true;

        }
      });
    };



})

.controller('MyStoresCtrl', function($scope, stores, $ionicPopover, $rootScope, $ionicPopup, $ionicActionSheet, $state) {
  $scope.goBack = function() {
    var previous_view = _.last($rootScope.previousView);
    $state.go(previous_view.fromState, previous_view.fromParams );
  };
  $scope.stores = stores;
})

;
