angular.module('districteuro.content.directives', [])

.directive('progressBar', function() {
	return {
		restrict: 'E',
		scope: {
			min: '@',
			max: '@',
			model: '=ngModel'
		},
		replace: true,
		templateUrl: 'views/components/content/food/progress-bar.template.tpl.html'
	};
})

;
