angular.module('districteuro.checkout.controllers', [])


.controller('CheckoutCtrl', function($scope, $state, $rootScope, products, CheckoutService, ShoppingCartService) {

  $scope.products = products;
  $scope.checkoutInfo = {};

  var tax = 0.07;

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

  $scope.cancel = function() {
    var previous_view = _.last($rootScope.previousView);
    $state.go(previous_view.fromState, previous_view.fromParams);
  };

  $scope.getSelectedAddress = function() {
    $scope.checkoutInfo.address = CheckoutService.getUserSelectedAddress();
    return $scope.checkoutInfo.address.street;
  };

  $scope.getSelectedCard = function() {
    $scope.checkoutInfo.card = CheckoutService.getUserSelectedCard();
    return $scope.checkoutInfo.card.number;
  };

  $scope.getSelectedCardImage = function() {
    $scope.checkoutInfo.card = CheckoutService.getUserSelectedCard();
    return $scope.checkoutInfo.card.image;
  };

  $scope.placeOrderIsValid = function() {
    return $scope.checkoutInfo.card && $scope.checkoutInfo.address &&
      !angular.equals($scope.checkoutInfo.address, {}) && !angular.equals($scope.checkoutInfo.card, {});
  };

  $scope.buy = function() {
    ShoppingCartService.emptyCart();
  };

})

.controller('CheckoutAddressCtrl', function($scope, $state, $rootScope, $ionicPopover, user_shipping_addresses, $ionicLoading, $ionicPopup, CheckoutService) {

  $ionicPopover.fromTemplateUrl('views/components/checkout/partials/address-chooser-popover.tpl.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.addresses_popover = popover;
  });
  $scope.openAddressesPopover = function($event) {
    $scope.addresses_popover.show($event);
  };
  $scope.selectShippingAddress = function(address) {
    $scope.addresses_popover.hide();
  };
  $scope.closeShippingAddressPopup = function() {
    $scope.addresses_popover.hide();

  }

  $scope.openCardsPopover = function($event) {
    $scope.cards_popover.show($event);
  };

  $scope.cancel = function() {
    var previous_view = _.last($rootScope.previousView);
    $state.go(previous_view.fromState, previous_view.fromParams);
  };

  $scope.billing_same_as_shipping_address = true;
  $scope.user_shipping_addresses = user_shipping_addresses;
  $scope.data = {};
  $scope.data.selected_address = {};
  $scope.show_new_address_button = true;

  $scope.selectShippingAddress = function(address) {
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

  $scope.deleteShippingAddress = function(address) {
    //do something and then close popup
  };

  $scope.addShippingAddress = function(address) {
    //do something and then close popup
  };

  $scope.editShippingAddress = function(address) {
    //do something and then close popup
  };

  $scope.closeShippingAddressPopup = function() {
    $scope.addresses_popover.hide();
    if ($scope.editAddressPopup)
      $scope.editAddressPopup.close();
    if ($scope.newAddressPopup)
      $scope.newAddressPopup.close();
  }

  $scope.showNewAddressPopup = function() {
    $scope.newAddressPopup = $ionicPopup.show({
      cssClass: 'popup-outer new-shipping-address-view',
      templateUrl: 'views/components/checkout/partials/new-shipping-address-popup.tpl.html',
      title: 'New Address',
      scope: $scope,
      buttons: [{
        text: 'Add',
        onTap: function(e) {
          // return $scope.data;
        }
      }]
    });
    $scope.newAddressPopup.then(function(res) {
      if (res) {
        console.log('hacer algo cuando apreta ADD con los datos llenos')
      } else {}
    });
  };

  $scope.showEditAddressPopup = function(address) {
    $scope.address = address;

    $scope.editAddressPopup = $ionicPopup.show({
      cssClass: 'popup-outer edit-shipping-address-view',
      templateUrl: 'views/components/checkout/partials/edit-shipping-address-popup.tpl.html',
      title: address.street,
      scope: $scope,
      buttons: [{
        text: 'Save',
        onTap: function(e) {
          // return $scope.data;
        }
      }]
    });
    $scope.editAddressPopup.then(function(res) {
      if (res) {
        console.log('hacer algo cuando apreta ADD con los datos llenos')
      } else {}
    });
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


.controller('CheckoutCardCtrl', function($scope, $state, $rootScope, $ionicPopover, user_credit_cards, $ionicLoading, $ionicPopup, CheckoutService) {

  $ionicPopover.fromTemplateUrl('views/components/checkout/partials/card-chooser-popover.tpl.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.cards_popover = popover;
  });

  $scope.cancel = function() {
    var previous_view = _.last($rootScope.previousView);
    $state.go(previous_view.fromState, previous_view.fromParams);
  };

  $scope.user_credit_cards = user_credit_cards;
  $scope.data = {};
  $scope.data.selected_card = {};
  $scope.show_new_card_button = true;

  $scope.selectCreditCard = function(card) {
    $scope.cards_popover.hide();
  };

  $scope.saveSelectedCreditCard = function(card) {
    CheckoutService.saveUserSelectedCard(card);
    $scope.cancel();
  };

  $scope.openCardsPopover = function($event) {
    console.log("opening cards popover");
    $scope.cards_popover.show($event);
  };

  $scope.deleteCreditCard = function(card) {
    //do something and then close popup
  }

  $scope.addCreditCard = function(card) {
    //do something and then close popup
  }

  $scope.editCreditCard = function(card) {
    //do something and then close popup
  }

  $scope.closeCreditCardPopup = function() {
    $scope.cards_popover.hide();
    if ($scope.editCardPopup)
      $scope.editCardPopup.close();
    if ($scope.newCardPopup)
      $scope.newCardPopup.close();
  }

  $scope.showNewCardPopup = function() {
    $scope.newCardPopup = $ionicPopup.show({
      cssClass: 'popup-outer new-card-view',
      templateUrl: 'views/components/checkout/partials/new-card-popup.tpl.html',
      title: 'New Card',
      scope: $scope,
      buttons: [{
        text: 'Add',
        onTap: function(e) {
          // return $scope.data;
        }
      }]
    });
    $scope.newCardPopup.then(function(res) {
      if (res) {
        console.log('hacer algo cuando apreta ADD con los datos llenos')
      } else {}
    });
  };

  $scope.showEditCardPopup = function(card) {
    $scope.card = card;

    $scope.editCardPopup = $ionicPopup.show({
      cssClass: 'popup-outer edit-card-view',
      templateUrl: 'views/components/checkout/partials/edit-card-popup.tpl.html',
      title: '**** ' + card.number.slice(-4),
      scope: $scope,
      buttons: [{
        text: 'Save',
        onTap: function(e) {
          // return $scope.data;
        }
      }]
    });
    $scope.editCardPopup.then(function(res) {
      if (res) {
        console.log('hacer algo cuando apreta ADD con los datos llenos')
      } else {}
    });
  };
})

.controller('CheckoutPromoCodeCtrl', function($scope) {

})

.controller('ThanksCtrl', function($scope, $rootScope, $stateParams, _) {
  var previous_view = _.last($rootScope.previousView);
  if (previous_view && previous_view.fromState === 'main.app.scheduleAppointment') {
    $scope.next_state = "main.app.feed.fashion";
    $scope.image = "./img/icons/appointment.svg";
    $scope.main_text_key = 'APPOINTMENT_SCHEDULED';
  } else { // if (view.fromState === 'main.app.checkout')
    $scope.next_state = "main.app.feed.fashion";
    $scope.image = "./img/icons/cart-confirmation.svg";
    $scope.main_text_key = 'CHECKOUT_PREPARING';
  }
})

;
