angular.module('districteuro.showrooms.controllers', [])

.controller('ShowroomsCtrl', function($scope, ShoppingCartService, TryCartService, ShowroomsFactory) {
	$scope.getProductsInCart = function(){
		return ShoppingCartService.getProducts().length;
	};

	$scope.getProductsInTryCart = function(){
    return TryCartService.getProducts().length;
  };

	$scope.showrooms = [];

	ShowroomsFactory.getShowroomsLists().then(function(data) {
		$scope.showrooms = data;
	})

})

.controller('ShowroomDetailsCtrl', function($scope, $state, $rootScope, showroom,$cordovaGlobalization, defaultLanguage) {
	$scope.goBack = function() {
    var previous_view = _.last($rootScope.previousView);
    $state.go(previous_view.fromState, previous_view.fromParams );
  };

	$scope.showroom = showroom;

	if(!window.localStorage.local_language){
		if (typeof navigator.globalization !== "undefined") {
			$cordovaGlobalization.getPreferredLanguage().then(function (result) {
				var language = getSuitableLanguage(result.value);
				window.localStorage.setItem("local_language", language);
			});
		} else {
			window.localStorage.setItem("local_language", defaultLanguage);
		}
	}
	$scope.language = window.localStorage.local_language;
});
