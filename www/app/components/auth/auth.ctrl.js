angular.module('districteuro.auth.controllers', [])

.controller('LoginCtrl', function($scope, $state, $ionicLoading, $timeout, AuthFactory, $rootScope) {
  $scope.skipIntro = function(){
    $state.go('main.app.feed.fashion');
  }

  $scope.user = {};

  $scope.user.email = "";
  $scope.user.password = "";

  function loginSuccess(user) {
    //goBack
    var previous_view = _.last($rootScope.previousView);
    $state.go(previous_view.fromState, previous_view.fromParams );
    $ionicLoading.hide();
  }

  function loginError(response) {
    $scope.user.password = '';
    $rootScope.loading = false;
  }

  $scope.doLogIn = function(){
    console.log("doing log in");

    $ionicLoading.show({
      template: 'Loging in...'
    });

    credentials = {
      'email': $scope.user.email,
      'password': $scope.user.password
    }
    AuthFactory.login(credentials).then(loginSuccess, loginError);

    $timeout(function(){
      $scope.error = "Invalid email or password";
      $ionicLoading.hide();
    }, 1500);
  };

  $scope.doFacebookLogIn = function(){
    console.log("doing FACEBOOK log in");

    $ionicLoading.show({
      template: 'Loging in...'
    });

    credentials = {
      'email': 'consumer@asap.uy',
      'password': 'asapadmin'
    }
    AuthFactory.login(credentials).then(loginSuccess, loginError);

    $timeout(function(){
      $scope.error = "Invalid email or password";
      $ionicLoading.hide();
    }, 1500);
  };
})

.controller('SignupCtrl', function($scope, $state, $ionicLoading, $timeout, $ionicModal, $rootScope, AuthFactory) {
    $scope.skipIntro = function(){
      $state.go('main.app.feed.fashion');
    }

    $scope.user = {};

    $scope.user.name = "";
    $scope.user.email = "";
    $scope.user.password = "";

    function loginSuccess(user) {
      $state.go('main.app.feed.fashion');
      $ionicLoading.hide();
    }

    function loginError(response) {
      $scope.user.password = '';
      $rootScope.loading = false;
    }

    $scope.doSignUp = function(){
        console.log("doing sign up");

        $ionicLoading.show({
          template: 'Creating account...'
        });

        credentials = {
          'email': 'consumer@asap.uy',
          'password': 'asapadmin'
        }
        AuthFactory.login(credentials).then(loginSuccess, loginError);

        $timeout(function(){
            $scope.error = "This is an error message";
            $ionicLoading.hide();
        }, 1000);
    };

    $scope.doFacebookSignUp = function(){
        console.log("doing FACEBOOK sign up");

        $ionicLoading.show({
          template: 'Creating account...'
        });

        credentials = {
          'email': 'consumer@asap.uy',
          'password': 'asapadmin'
        }
        AuthFactory.login(credentials).then(loginSuccess, loginError);

        $timeout(function(){
            $scope.error = "This is an error message";
            $ionicLoading.hide();
        }, 1000);
    };

    $ionicModal.fromTemplateUrl('views/shared/templates/legal/privacy-policy.tpl.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.privacy_policy_modal = modal;
    });

    $ionicModal.fromTemplateUrl('views/shared/templates/legal/terms-of-service.tpl.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.terms_of_service_modal = modal;
    });

    $scope.showTerms = function(){
        $scope.terms_of_service_modal.show();
    };

    $scope.showPrivacyPolicy = function(){
        $scope.privacy_policy_modal.show();
    };
})

.controller('ForgotPasswordCtrl', function($scope, $state, $ionicLoading, $timeout) {
    $scope.user = {};

    $scope.user.email = "";

    $scope.recoverPassword = function(){
        console.log("recover password");

        $ionicLoading.show({
          template: 'Recovering password...'
        });

        $timeout(function(){
            $state.go('main.app.feed.fashion');
            $ionicLoading.hide();
        }, 800);
    };
})

;
