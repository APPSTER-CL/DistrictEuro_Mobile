angular.module('districteuro.filters.controllers', [])

.controller('FiltersCtrl', function($scope, $state, $rootScope, $ionicSlideBoxDelegate, StorageService) {

	$scope.cancelRefine = function(){
		var previous_view = _.last($rootScope.previousView);
		$state.go(previous_view.fromState, previous_view.fromParams );
	};

	$scope.applyRefine = function(){
		var filters = {
			category_filter: $scope.category.filter,
			country_filter: $scope.country.filter,
			price_filter: $scope.price_filter,
			rate_filter: $scope.rate.filter
		}
		StorageService.save(configuration.storage.search_query, '');
		StorageService.save(configuration.storage.filters, JSON.stringify(filters));

		var previous_view = _.last($rootScope.previousView);
		$state.go(previous_view.fromState, previous_view.fromParams );
	};

	$scope.clear_category = function(){
		$scope.category = {
			filter: null
		};
	};

	$scope.clear_country = function(){
		$scope.country = {
			filter: null
		};
	};

	function init() {
			$scope.category = {
				filter: null
			};

			$scope.country = {
				filter: null
			};

			$scope.price_filter = {
				from: 200,
				to: 500
			};

			$scope.rate = {
				filter: null
			}

			var filters = StorageService.get(configuration.storage.filters);
	    if (filters) {
	      filters = JSON.parse(filters);
	      $scope.category.filter = filters.category_filter;
	      $scope.country.filter = filters.country_filter;
	      $scope.price_filter = filters.price_filter;
	    }
  }
  init();
})

;
