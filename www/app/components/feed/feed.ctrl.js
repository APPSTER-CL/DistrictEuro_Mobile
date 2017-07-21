angular.module('districteuro.feed.controllers', [])

.controller('FeedCtrl', function($scope, $rootScope, $state, $window, $timeout,
	 ShoppingCartService, TryCartService, configuration, StorageService) {

	$scope.getProductsInCart = function(){
		return ShoppingCartService.getProducts().length;
	};

	$scope.getProductsInTryCart = function(){
      return TryCartService.getProducts().length;
  };

	$scope.searchEnable = $state.current.name == 'main.app.feed.fashion';

	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
		$scope.searchEnable = $state.current.name == 'main.app.feed.fashion';
		if ($scope.searchActive) focusSearch();
	});

	$scope.searchQuery = StorageService.get(configuration.storage.search_query) || '';
	$scope.searchActive = !!$scope.searchQuery;
	$rootScope.onSearchProducts = null;

	$scope.searchProducts = function($event) {
		if ($event) {
			$event.preventDefault();
			angular.element($event.target).children('input')[0].blur();
		}
		StorageService.save(configuration.storage.search_query, $scope.searchQuery);
		$scope.$broadcast('searchProducts');
	};

	$scope.toggleSearch = function(elem) {
		$scope.searchActive = !$scope.searchActive;
		if ($scope.searchActive) {
			focusSearch();
		} else {
		 	$scope.cancelSearch();
		}
	};

	function focusSearch() {
			$timeout(function () {
			 $window.document.getElementById('searchProductInput').focus();
		 }, 100);
	}

	$scope.openSearch = function(){
			$scope.searchActive = true;
			focusSearch();
	};

	$scope.cancelSearch = function() {
		$scope.searchQuery = '';
		$scope.searchProducts();
		$scope.searchActive = !!$scope.searchQuery;
	}
})

.controller('FashionCtrl', function($scope, $rootScope, $filter, FashionService) {

	function init(products) {
			$scope.next = products.next;
			$scope.products = products.results;
			angular.forEach($scope.products, function(product) {
		    product.price_sale = ($filter('number')(product.price_amount*0.75,2)).replace(",",".");
				product.price_amount = ($filter('number')(product.price_amount*1,2)).replace(",",".");
		  });
	}

	FashionService.getProducts().then(function(data) {
		init(data);
	});

	$scope.loadMoreProducts = function(){
		if ($scope.next != null){
			FashionService.loadMoreProducts($scope.next).then(function(response){
				$scope.next = response.next;
				$scope.products = $scope.products.concat(response.results);
				angular.forEach($scope.products, function(product) {
			    product.price_sale = ($filter('number')(product.price_amount*0.75,2)).replace(",",".");
				  product.price_amount = ($filter('number')(product.price_amount*1,2)).replace(",",".");
			  });

				$scope.$broadcast('scroll.infiniteScrollComplete');
			},function(){
					$scope.$broadcast('scroll.infiniteScrollComplete');
			});
		}else{
			$scope.$broadcast('scroll.infiniteScrollComplete');
		}
	};

	FashionService.getProducts().then(function(data) {
		init(data);
	});

	FashionService.getBestSellers().then(function(data) {
		var best_sellers = data.results;
		var size = Math.max(3, best_sellers.length - best_sellers.length % 3);
		$scope.best_sellers = best_sellers.slice(0, size);
		angular.forEach($scope.best_sellers, function(product) {
			product.price_sale = ($filter('number')(product.price_amount*0.75,2)).replace(",",".");
			product.price_amount = ($filter('number')(product.price_amount*1,2)).replace(",",".");
		});
	});

	$scope.$on('searchProducts', function() {
		$scope.products = [];
		$scope.searching = true;
		FashionService.getProducts().then( function(result) {
				$scope.searching = false;
				init(result);
		});
	});
})

.controller('TravelCtrl', function($scope,  $stateParams, TravelService) {
	$scope.countries = {};
	TravelService.getCountries().then(function(countries) {
		$scope.countries = countries;
	});
})

;
