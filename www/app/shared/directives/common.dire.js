angular.module('districteuro.directives', [])

.directive('multiBg', function(_) {
  return {
    scope: {
      multiBg: '=',
      interval: '=',
      helperClass: '@'
    },
    controller: function($scope, $element, $attrs) {
      $scope.loaded = false;
      var utils = this;

      this.animateBg = function() {
        // Think i have to use apply because this function is not called from this controller ($scope)
        $scope.$apply(function() {
          $scope.loaded = true;
          $element.css({
            'background-image': 'url(' + $scope.bg_img + ')'
          });
        });
      };

      this.setBackground = function(bg) {
        $scope.bg_img = bg;
      };

      if (!_.isUndefined($scope.multiBg)) {
        if (_.isArray($scope.multiBg) && ($scope.multiBg.length > 1) && !_.isUndefined($scope.interval) && _.isNumber($scope.interval)) {
          // Then we need to loop through the bg images
          utils.setBackground($scope.multiBg[0]);
        } else {
          // Then just set the multiBg image as background image
          utils.setBackground($scope.multiBg[0]);
        }
      }
    },
    templateUrl: 'views/shared/templates/common/multi-bg.tpl.html',
    restrict: 'A',
    replace: true,
    transclude: true
  };
})


.directive('bg', function() {
  return {
    restrict: 'A',
    require: '^multiBg',
    scope: {
      ngSrc: '@'
    },
    link: function(scope, element, attr, multiBgController) {
      element.on('load', function() {
        multiBgController.animateBg();
      });
    }
  };
})


.directive('showHideContainer', function() {
  return {
    scope: {

    },
    controller: function($scope, $element, $attrs) {
      $scope.show = false;

      $scope.toggleType = function($event) {
        $event.stopPropagation();
        $event.preventDefault();

        $scope.show = !$scope.show;

        // Emit event
        $scope.$broadcast("toggle-type", $scope.show);
      };
    },
    templateUrl: 'views/shared/templates/common/show-hide-password.tpl.html',
    restrict: 'A',
    replace: false,
    transclude: true
  };
})


.directive('showHideInput', function() {
  return {
    scope: {

    },
    link: function(scope, element, attrs) {
      // listen to event
      scope.$on("toggle-type", function(event, show) {
        var password_input = element[0],
          input_type = password_input.getAttribute('type');

        if (!show) {
          password_input.setAttribute('type', 'password');
        }

        if (show) {
          password_input.setAttribute('type', 'text');
        }
      });
    },
    require: '^showHideContainer',
    restrict: 'A',
    replace: false,
    transclude: false
  };
})

.directive('preImg', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      ratio: '@',
      helperClass: '@',
      excludeClass: '@'
    },
    link: function(scope, element, attrs) {
      var excludeClass = 'excludeClass' in attrs && attrs.excludeClass === "true";
      scope.pre_img = excludeClass ? '': 'pre-img';
    },
    controller: function($scope) {
      $scope.loaded = false;

      this.hideSpinner = function() {
        // Think i have to use apply because this function is not called from this controller ($scope)
        $scope.$apply(function() {
          $scope.loaded = true;
        });
      };
    },
    templateUrl: 'views/shared/templates/common/pre-img.tpl.html'
  };
})

.directive('spinnerOnLoad', function() {
  return {
    restrict: 'A',
    require: '^preImg',
    scope: {
      ngSrc: '@'
    },
    link: function(scope, element, attr, preImgController) {
      element.on('load', function() {
        preImgController.hideSpinner();
      });
    }
  };
})


.directive('socialShare', function($cordovaSocialSharing, $ionicPlatform, $timeout) {
  return {
    restrict: 'A',
    scope: {
      share: '=',
    },
    controller: function($scope) {

    },
    link: function(scope, element, attr, ctrl) {
      scope.disabled = false;
      var post = scope.share;

      scope.disable = function() {
        scope.disabled = true;
        $timeout(function() {
          element.attr('disabled', scope.disabled);
        }, 0);
      };

      scope.enable = function() {
        scope.disabled = false;
        $timeout(function() {
          element.attr('disabled', scope.disabled);
        }, 0);
      };

      element.on('click', function(event) {
        if (scope.disabled) {
          event.preventDefault();
          event.stopImmediatePropagation();
        } else {
          scope.disable();
          $ionicPlatform.ready(function() {
            try {
              $cordovaSocialSharing
                .share('Check the following post: ' + post.title, null, null, null) // Share via native share sheet
                .then(function(result) {
                  // Success!
                  scope.enable();
                }, function(err) {
                  // An error occured. Show a message to the user
                  scope.enable();
                });
            } catch (err) {
              scope.enable();
            }
          });
        }
      });
    }
  };
})

//Use this directive to open external links using inAppBrowser cordova plugin
.directive('dynamicAnchorFix', function($ionicGesture, $timeout, $cordovaInAppBrowser) {
  return {
    scope: {},
    link: function(scope, element, attrs) {
      $timeout(function() {
        var anchors = element.find('a');
        if (anchors.length > 0) {
          angular.forEach(anchors, function(a) {

            var anchor = angular.element(a);

            anchor.bind('click', function(event) {
              event.preventDefault();
              event.stopPropagation();

              var href = event.currentTarget.href;
              var options = {};

              //inAppBrowser see documentation here: http://ngcordova.com/docs/plugins/inAppBrowser/

              $cordovaInAppBrowser.open(href, '_blank', options)
                .then(function(e) {
                  // success
                })
                .catch(function(e) {
                  console.log("error: " + e);
                  // error
                });
            });
          });
        }
      }, 10);
    },
    restrict: 'A',
    replace: false,
    transclude: false
  };
})

.directive('pageLoader', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    template: "<div class='page-load-spinner'><ion-spinner icon='ios'></ion-spinner></div>"
  };
})

.directive('starRating', starRating);

function starRating() {
  var directive = {
    restrict: 'EA',
    replace: true,
    template: '<ul class="districteuro-stars">' +
      '  <li class="star" ng-style="{\'font-size\': size}" ng-repeat="item in items track by $index">' +
      '    <i class="fa {{getIcon($index)}}" aria-hidden="true" style="outline:none;" ng-click="setValue($index, $event)" ng-style="{color:getColor($index), \'font-size\': size, height: size, margin: padding}"></i>' +
      '  </li>' +
      '</ul>',
    require: 'ngModel',
    scope: {
      ngModel: '='
    },
    link: link
  };

  return directive;

  function link(scope, element, attrs, ngModelCtrl) {
    scope.readonly = attrs.ngReadonly != undefined;
    scope.items = new Array(+attrs.max);
    scope.listClass = attrs.listClass || 'angular-input-stars';
    scope.color1 = attrs.color1 || "#5ec9c9";
    scope.color2 = attrs.color2 || "gray";
    scope.size = attrs.size + "px" || "24px";
    var padding = attrs.padding || "0";
    scope.padding = "0px " + padding + "px " + "0px " + padding + "px" || "0px";

    ngModelCtrl.$render = function() {
      scope.lastValue = ngModelCtrl.$viewValue || 0;
    };

    scope.getIcon = function(index) {
      var firstNumber = Math.floor(scope.lastValue);
      var decimal = scope.lastValue % 1;
      if (index < firstNumber) {
        icon = "fa-star"
      } else if (index > firstNumber) {
        icon = "fa-star-o"
      } else if (index == firstNumber) {
        icon = decimal >= 0.5 ? "fa-star-half-o" : "fa-star-o";
      }
      return icon
    };

    scope.getColor = function(index) {
      var firstNumber = Math.floor(scope.lastValue);
      var decimal = scope.lastValue % 1;
      var color = index >= scope.lastValue ? scope.color2 : scope.color1;
      if (index == firstNumber) {
        color = decimal >= 0.5 ? scope.color1 : scope.color2;
      }
      return color
    };

    scope.setValue = function(index, e) {
      // ignore setting value if readonly
      if (scope.readonly) {
        return;
      }

      var star = e.target,
        newValue;

      if (e.pageX < star.getBoundingClientRect().left + star.offsetWidth / 2) {
        newValue = index + 1;
      } else {
        newValue = index + 1;
      }
      // sets to 0 if the user clicks twice on the first "star"
      // the user should be allowed to give a 0 score
      if (newValue === scope.lastValue && newValue === 1) {
        newValue = 0;
      }

      scope.lastValue = newValue;

      ngModelCtrl.$setViewValue(newValue);
      ngModelCtrl.$render();

      //Execute custom trigger function if there is one
      if (attrs.onStarClick) {
        scope.$eval(attrs.onStarClick);
      }

    };
  }
}

;
