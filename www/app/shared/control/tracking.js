var printStackTrace = '';

angular.module('analytics.mixpanel')

.config(function($mixpanelProvider, MIXPANEL_API_KEY, APP_NAME, APP_VERSION) { //, MIXPANEL_DOWNLOAD_REFERRAL, MIXPANEL_OPENED_USING) {
  $mixpanelProvider.apiKey(MIXPANEL_API_KEY);

  $mixpanelProvider.superProperties({
    //download_referral: MIXPANEL_DOWNLOAD_REFERRAL,
    //opened_using: MIXPANEL_OPENED_USING,
    app: APP_NAME,
    app_version: APP_VERSION
  });
});


angular.module('districteuro.tracking', [
  'analytics.mixpanel'
])

.run(function($ionicPlatform, $rootScope, $state, $mixpanel) {

  $ionicPlatform.ready(function() {
    if(ionic.Platform.isWebView())
    {
      var deviceInformation = ionic.Platform.device();
      $mixpanel.identify(deviceInformation.uuid);
      $mixpanel.register(deviceInformation);
      $mixpanel.track("Opened App");

      $rootScope.$on("$stateChangeSuccess", function() {
        $mixpanel.track("Navigated to", {
          "view": $state.current.name
        });
    	});
    }
  });

  $ionicPlatform.on("resume", function(){
    if(ionic.Platform.isWebView())
    {
      $mixpanel.track("Resumed App");
    }
  });
})

.factory("stacktraceService", function(){
	return({
		print: printStackTrace
	});
})

.config(function ($provide) {
  $provide.decorator("$exceptionHandler", function($delegate, stacktraceService, $window, $mixpanel) {
    return function (exception, cause) {
			var errorMessage = exception.toString(),
					stackTrace = exception,//stacktraceService.print({ e: exception }),
					errorDetails = {
						stack_trace: stackTrace,
						url: $window.location.href
					};

      if(ionic.Platform.isWebView())
      {
        $mixpanel.track('JavaScript Error', errorDetails);
      }

      $delegate(exception, cause);
    };
  });
});
