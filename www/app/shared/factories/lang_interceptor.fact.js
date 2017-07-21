angular.module('districteuro.lang_interceptor', [
  'districteuro.constants'
])
.factory('LangInterceptorFactory',
  function($rootScope, $q, AUTH_EVENTS, $translate) {
    return {
      request: function(config) {
        config.headers['Accept-Language'] = $translate.use();
        return config;
      }
    };
});
