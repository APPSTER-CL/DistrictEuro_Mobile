angular.module('districteuro.content.controllers', [])

.controller('FashionContentCtrl', function($scope, $state, $translate, $ionicPopup, $rootScope, $stateParams,
  ShoppingCartService, $ionicLoading, TryCartService, FavoritesService, $filter, FashionService) {
  $scope.goBack = function() {
    var previous_view = _.last($rootScope.previousView);
    $state.go(previous_view.fromState, previous_view.fromParams);
  };

  $scope.getProductsInCart = function() {
    return ShoppingCartService.getProducts().length;
  };

  $scope.getProductsInTryCart = function(){
      return TryCartService.getProducts().length;
  };

  $scope.product = null;
  $scope.infographics = [];

  $scope.preOrder = function(product) {
    if (product.is_pre_orderd) {
      return;
    }
    $ionicLoading.show({
      template: $translate('ADDING_PRE_ORDER'),
      duration: 1000
    });
    product.is_pre_orderd = true;
  };

  $scope.addToCart = function(product) {
    if (product.is_in_cart) {
      product.is_in_cart = false;
      ShoppingCartService.removeProduct(product);
    } else {
      $ionicLoading.show({
        template: $translate('ADDING_CART'),
        duration: 1000
      });

      product.qty = 1;
      product.is_in_cart = true;
      ShoppingCartService.addProduct(product);
    }
  };

  $scope.main_button_label = 'PRODUCTS_ADD_CART';

  FashionService.getProduct($stateParams.productId).then(function(data) {
    $scope.product = data;
    $scope.product.price_sale = ($filter('number')($scope.product.price_amount * 0.75, 2)).replace(",", ".");
    $scope.product.price_amount = ($filter('number')($scope.product.price_amount * 1, 2)).replace(",", ".");
    $scope.product.store.getDescription = function() {
      var store = $scope.product.store;
      if (store.categories.length) {
        return store.categories.map(function(obj) {return obj.name;}).join(' | ');
      }
      return store.description;
    };

    if (data.is_in_cart || $scope.product.stock_quantity > 0) {
      $scope.main_button_label = 'PRODUCTS_ADD_CART';
      $scope.main_button_action = $scope.addToCart;
    } else {
      $scope.main_button_label = 'PRODUCTS_PRE_ORDER';
      $scope.main_button_action = $scope.preOrder;
    }
  });

  $scope.addToList = function(product) {
    if (product.is_in_favorites) {
      product.is_in_favorites = false;
      FavoritesService.removeProduct(product);
    } else {
      $ionicLoading.show({
        template: $translate('ADDING_FAVS'),
        duration: 1000
      });

      product.qty = 1;
      product.is_in_favorites = true;
      FavoritesService.addProduct(product);
    }
  };

  $scope.addToTry = function(product) {
    if (product.is_in_try_on) {
      TryCartService.removeProduct(product);
      $scope.product.is_in_try_on = false;
    } else {
      $ionicLoading.show({
        template: $translate('ADDING_TRY_CART'),
        duration: 1000
      });
      $scope.product.is_in_try_on = true;
      product.qty = 1;
      TryCartService.addProduct(product);
    }
  };

  var colorPopup = {},
    sizePopup = {};

  $scope.chosen_color = 'Navy';
  $scope.chosen_size = 'M';

  $scope.openColorChooser = function() {
    colorPopup = $ionicPopup.show({
      cssClass: 'popup-outer color-chooser-view',
      templateUrl: 'views/components/content/fashion/color-chooser.tpl.html',
      scope: angular.extend($scope, {
        chosen_color: $scope.chosen_color
      }),
      title: 'Color',
      buttons: [{
        text: 'Close',
        type: 'close-popup'
      }]
    });
  };

  $scope.openSizeChooser = function() {
    sizePopup = $ionicPopup.show({
      cssClass: 'popup-outer size-chooser-view',
      templateUrl: 'views/components/content/fashion/size-chooser.tpl.html',
      scope: angular.extend($scope, {
        chosen_size: $scope.chosen_size
      }),
      title: 'Size',
      buttons: [{
        text: 'Close',
        type: 'close-popup'
      }]
    });
  };
})

.controller('TravelContentCtrl', function($scope, $state, $rootScope, TravelService, $filter, $stateParams) {
  $scope.goBack = function() {
    var previous_view = _.last($rootScope.previousView);
    $state.go(previous_view.fromState, previous_view.fromParams);
  };

  $scope.regions = null;
  $scope.country = null;
  $scope.classic_products = null;
  $scope.popular_stores = null;
	$scope.page_loaded = false;
	var loaded_items = 0;

	function onServiceResponse() {
		loaded_items++;
		$scope.page_loaded = loaded_items >= 4;
	}

  TravelService.getRegions($stateParams.productId).then(function(data) {
    $scope.regions = data;
		onServiceResponse();
  });

  TravelService.getCountry($stateParams.productId).then(function(data) {
    $scope.country = data;
		onServiceResponse();
  });

  TravelService.getClassicProducts($stateParams.productId).then(function(data) {
    $scope.classic_products = data;
    angular.forEach($scope.classic_products, function(product) {
      product.price_sale = ($filter('number')(product.price_amount * 0.75, 2)).replace(",", ".");
      product.price_amount = ($filter('number')(product.price_amount * 1, 2)).replace(",", ".");
    });
		onServiceResponse();
  });

  TravelService.getPopularStores($stateParams.productId).then(function(data) {
    var store_description = function() {
      if (this.categories.length) {
        return this.categories.map(function(obj) {return obj.name;}).join(' | ');
      }
      return this.description;
    };
    data.results.forEach(function(obj) {
      obj.getDescription = store_description;
    })
    $scope.popular_stores = data;
		onServiceResponse();
  });
})

.controller('RegionContentCtrl', function($scope, $state, $rootScope, TravelService, $q, $stateParams) {
  $scope.goBack = function() {
    var previous_view = _.last($rootScope.previousView);
    $state.go(previous_view.fromState, previous_view.fromParams);
  };

  TravelService.getRegionDetails($stateParams.regionId).then(function(data) {
    $scope.region = data;
    var promises = [];
    angular.forEach($scope.region.stores, function(store) {
      var deferred = $q.defer();
      deferred.resolve(TravelService.getStoreDetail(store.store));
      promises.push(deferred.promise);
    });
    $q.all(promises).then(
      function(results) {
        var store_description = function() {
          if (this.categories.length) {
            return this.categories.map(function(obj) {return obj.name;}).join(' | ');
          }
          return this.description;
        };
        results.forEach(function(obj) {
          obj.getDescription = store_description;
        });
        $scope.region.stores = results;
      },
      function(response) {}
    );
  });
})

.controller('StoreContentCtrl', function($scope, $state, $rootScope, $stateParams, $sce, $filter, TravelService) {
  $scope.goBack = function() {
    var previous_view = _.last($rootScope.previousView);
    $state.go(previous_view.fromState, previous_view.fromParams);
  };

  $scope.storeLiked = false;
  $scope.store = {};
  $scope.isMap = false;
  $scope.hasMap = false;

  $scope.toggleLike = function() {
    $scope.storeLiked = !$scope.storeLiked;
  };
  $scope.toggleMap = function() {
    $scope.isMap = !$scope.isMap;
  };

  TravelService.getStoreDetail($stateParams.storeId).then(function(data) {
    $scope.store = data;

    if($scope.store.images && $scope.store.images.length > 0)
    {
      $scope.store.main_image = $scope.store.images[0];
      $scope.store.images.splice(0, 1);
    }

    $scope.hasMap = !(data.store_location[0].latitude == null || data.store_location[0].longitude == null);
  });

  TravelService.getStoresProducts($stateParams.storeId).then(function(data) {
    $scope.products = data;
    angular.forEach($scope.products.results, function(product) {
      product.price_sale = ($filter('number')(product.price_amount * 0.75, 2)).replace(",", ".");
      product.price_amount = ($filter('number')(product.price_amount * 1, 2)).replace(",", ".");
    });
  });

  $scope.data = {};
  $scope.data.currentPage = 0;
  $scope.medias = [];

  var setupSlider = function() {
    //some options to pass to our slider
    $scope.data.sliderOptions = {
      initialSlide: 0,
      direction: 'horizontal', //or vertical
      speed: 300 //0.3s transition
    };

    //create delegate reference to link with slider
    $scope.data.sliderDelegate = null;

    //watch our sliderDelegate reference, and use it when it becomes available
    $scope.$watch('data.sliderDelegate', function(newVal, oldVal) {
      if (newVal != null) {
        $scope.data.sliderDelegate.on('slideChangeEnd', function() {
          $scope.data.currentPage = $scope.data.sliderDelegate.activeIndex;
          //use $scope.$apply() to refresh any content external to the slider
          $scope.$apply();
        });
      }
    });
  };

  setupSlider();

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }
})

;
