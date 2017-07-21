angular.module('districteuro.getting-started.directives', [])

.directive('customCheckbox', function($ionicConfig) {
  return {
    restrict: 'E',
		scope: {
			title: '@',
			model: '=ngModel'
		},
    replace: true,
    transclude: true,
    templateUrl: 'views/components/getting-started/custom-checkbox.tpl.html',
    compile: function(element, attr) {
      var checkboxWrapper = element[0].querySelector('.checkbox');
      checkboxWrapper.classList.add('checkbox-' + $ionicConfig.form.checkbox());
    }
  };
})


;
