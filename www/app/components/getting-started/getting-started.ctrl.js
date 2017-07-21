angular.module('districteuro.getting-started.controllers', [])

.controller('GettingStartedCtrl', function($scope, $rootScope, $state, $ionicSlideBoxDelegate, $cordovaGlobalization, defaultLanguage) {
	$scope.skipIntro = function(){
		$state.go('main.app.feed.fashion');
	}

	$scope.show_call_to_action_button = false;
	$scope.show_skip_button = false;

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

	var slides = $ionicSlideBoxDelegate.$getByHandle('getting-started-slides');

	$scope.pagerClicked = function(index){
		slides.slide(index);
	};

	$scope.slideChanged = function($index){
		if(($index+1) === slides.slidesCount())
		{
			// We are in the last slide, show "Sign Up" call to action button
			$scope.show_call_to_action_button = true;
			slides.update();
		}
		else
		{
			$scope.show_call_to_action_button = false;
		}

		// Show skip on every slide except the firts one
		if(($index+1) > 1)
		{
			$scope.show_skip_button = true;
		}
		else
		{
			$scope.show_skip_button = false;
		}
	};

	// Getting started questions
	$scope.browsing = 'Plus Size';

	$scope.pick_categories = {};
	$scope.pick_categories.tops = true;
	$scope.pick_categories.jackets = true;

})


;