angular.module('districteuro.directives')
.directive('longDescription', function(){

  function link(scope, element, attrs) {

      var length = parseInt(attrs.length) || 130;
      scope.isTextLongEnough = false;

      scope.showMoreText = attrs.showMoreText || 'Show more';
      scope.showLessText = attrs.showLessText || 'Show less';
      scope.fixLength = 'fixLength' in attrs && attrs.fixLength === 'true';

      function updateText(description) {
        if (!description) {
          return;
        }
        if (scope.isTextLongEnough = (description.length > length)) {
          scope.long_description = description;
          scope.short_description = description.substring(0, length) + '...';
        } else {
          scope.short_description = description;
        }
        scope.description = scope.short_description;
        scope.showingMore = false;
      }

      scope.$watch('text', function(value) {
        updateText(value);
      });
      scope.$watch('fixLength', function(value) {
        scope.fixLength = 'fixLength' in attrs && attrs.fixLength === 'true';
      });

      function toggle() {
        scope.showingMore = !scope.showingMore;
        if (scope.showingMore) {
          scope.description = scope.long_description;
        } else {
          scope.description = scope.short_description;
        }
      }
      scope.toggle = toggle;
      updateText(attrs.text);
  }

  return {
    restrict: 'E',
    templateUrl: 'views/shared/templates/directives/longDescription.tpl.html',
    // template: '<span>{{description}}</span>',
    replace: true,
    scope: {
      text: '@',
      length: '@',
      fixLength: '@'
    },
    link: link
  }
});
