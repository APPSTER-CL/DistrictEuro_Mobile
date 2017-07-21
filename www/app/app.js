angular.module('underscore', [])
  .factory('_', function() {
    return window._; // assumes underscore has already been loaded on the page
  });

angular.module('districteuro', [
  'ionic',

  'districteuro.views',

  'districteuro.account.controllers',
  'districteuro.account.directives',
  'districteuro.account.services',

  'districteuro.auth.controllers',
  'districteuro.auth.directives',
  'districteuro.auth.services',

  'districteuro.checkout.controllers',
  'districteuro.checkout.directives',
  'districteuro.checkout.services',

  'districteuro.content.controllers',
  'districteuro.content.directives',

  'districteuro.feed.controllers',
  'districteuro.feed.directives',
  'districteuro.feed.filters',
  'districteuro.feed.services',

  'districteuro.sort.controllers',

  'districteuro.filters.controllers',
  'districteuro.filters.directives',
  'districteuro.filters.services',

  'districteuro.getting-started.controllers',
  'districteuro.getting-started.directives',
  'districteuro.getting-started.services',

  'districteuro.liked.controllers',
  'districteuro.liked.directives',
  'districteuro.liked.services',

  'districteuro.shopping-cart.controllers',
  'districteuro.shopping-cart.directives',
  'districteuro.shopping-cart.services',

  'districteuro.walkthrough.controllers',
  'districteuro.walkthrough.directives',
  'districteuro.walkthrough.services',

  'districteuro.showrooms.controllers',
  'districteuro.showrooms.services',
  'districteuro.showrooms.factories',

  'districteuro.storage_factory',

  'districteuro.constants',
  'districteuro.controllers',
  'districteuro.auth_interceptor',
  'districteuro.lang_interceptor',
  'districteuro.auth_factory',
  'districteuro.dao_factory',
  'districteuro.user_factory',
  'districteuro.directives',
  'districteuro.providers',
  'districteuro.auth_utilities',
  'districteuro.storage_service',
  'analytics.mixpanel',
  'districteuro.tracking',
  'ngCordova',
  'tmh.dynamicLocale',
  'pascalprecht.translate',
  'underscore',
  'angularMoment',
  'ngMap',
  'ngRangeSlider',
  'ngStorage',
  'ionic-timepicker'
])

.constant('availableLanguages', ['en-US', 'es-ES', 'zh-CN'])
.constant('defaultLanguage', 'en-US')

.config(function(tmhDynamicLocaleProvider, $translateProvider, defaultLanguage, $ionicConfigProvider, $httpProvider) {

  // For new languages the locales could be downloaded from https://code.angularjs.org/1.3.6/i18n/
  tmhDynamicLocaleProvider.localeLocationPattern('app/shared/locales/angular-locale_{{locale}}.js');
  $translateProvider.useStaticFilesLoader({
    'prefix': 'app/shared/i18n/',
    'suffix': '.json'
  });
  // Enable escaping of HTML
  //$translateProvider.useSanitizeValueStrategy('escape');
  $translateProvider.preferredLanguage(defaultLanguage);

  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.views.swipeBackEnabled(false);
  $ionicConfigProvider.form.checkbox('circle');

  $httpProvider.interceptors.push('LangInterceptorFactory');
  $httpProvider.useApplyAsync(true);

  if (!ionic.Platform.isWebView()) {
    console.log("jsScrolling");
    $ionicConfigProvider.scrolling.jsScrolling(false);
  }
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('intro', {
      url: '/intro',
      abstract: true,
      templateUrl: 'views/shared/templates/intro.tpl.html'
    })

  .state('intro.walkthrough-welcome', {
    url: '/walkthrough-welcome',
    views: {
      'intro-view@intro': {
        templateUrl: 'views/components/walkthrough/learn.tpl.html',
        controller: 'GettingStartedCtrl'
      }
    }
  })

  .state('intro.walkthrough-learn', {
    url: '/walkthrough-learn',
    views: {
      'intro-view@intro': {
        templateUrl: 'views/components/walkthrough/learn.tpl.html',
        controller: 'GettingStartedCtrl'
      }
    }
  })

  .state('intro.auth-login', {
    url: '/auth-login',
    views: {
      'intro-view@intro': {
        templateUrl: 'views/components/auth/login.tpl.html',
        controller: 'LoginCtrl'
      }
    }
  })

  .state('intro.auth-signup', {
    url: '/auth-signup',
    views: {
      'intro-view@intro': {
        templateUrl: 'views/components/auth/signup.tpl.html',
        controller: 'SignupCtrl'
      }
    }
  })

  .state('intro.auth-forgot-password', {
    url: '/forgot-password',
    views: {
      'intro-view@intro': {
        templateUrl: 'views/components/auth/forgot-password.tpl.html',
        controller: 'ForgotPasswordCtrl'
      }
    }
  })

  .state('main', {
    url: '/main',
    abstract: true,
    templateUrl: 'views/shared/templates/main.tpl.html'
  })

  .state('main.app', {
    url: '/app',
    abstract: true,
    views: {
      'main-view@main': {
        templateUrl: 'views/shared/templates/app.tpl.html',
        controller: 'AppCtrl'
      }
    },
    resolve: {
      logged_user: function(AuthService) {
        return AuthService.getLoggedUser();
      }
    }
  })

  .state('main.app.filters', {
    url: '/filters',
    views: {
      'main-view@main': {
        templateUrl: 'views/components/filters/filters.tpl.html',
        controller: 'FiltersCtrl'
      }
    }
  })

  .state('main.app.feed', {
    url: '/feed',
    views: {
      'app-feed@main.app': {
        templateUrl: 'views/components/feed/feed.tpl.html',
        controller: 'FeedCtrl'
      }
    }
  })

  .state('main.app.feed.fashion', {
    url: '/fashion',
    views: {
      'category-feed@main.app.feed': {
        templateUrl: 'views/components/feed/fashion.tpl.html',
        controller: 'FashionCtrl'
      }
    }
  })

  .state('main.app.feed.fashion.content', {
      url: '/content/:productId',
      views: {
        'main-view@main': {
          templateUrl: 'views/components/content/fashion.tpl.html',
          controller: 'FashionContentCtrl'
        }
      }
    })
    .state('main.app.feed.fashion.product_detail.general_info', {
      url: '/content/product_detail/general',
      views: {
        'main-view@main': {
          templateUrl: 'views/components/content/product_detail/general_info.tpl.html',
          controller: 'FashionContentCtrl'
        }
      }
    })
    .state('main.app.feed.fashion.product_detail.infographics', {
      url: '/content/product_detail/general',
      views: {
        'main-view@main': {
          templateUrl: 'views/components/content/product_detail/infographics.tpl.html',
          controller: 'FashionContentCtrl'
        }
      }
    })

  .state('main.app.feed.fashion.content.store_detail', {
    url: '/store/:storeId',
    views: {
      'main-view@main': {
        templateUrl: 'views/components/content/regions/store_detail.tpl.html',
        controller: 'StoreContentCtrl'
      }
    }
  })


  .state('main.app.feed.travel', {
    url: '/travel',
    views: {
      'category-feed@main.app.feed': {
        templateUrl: 'views/components/feed/travel.tpl.html',
        controller: 'TravelCtrl'
      }
    }
  })

  .state('main.app.feed.travel.content', {
    url: '/content/:productId',
    views: {
      'main-view@main': {
        templateUrl: 'views/components/content/travel.tpl.html',
        controller: 'TravelContentCtrl'
      }
    }
  })

  .state('main.app.feed.travel.content.regions', {
    url: '/regions/:regionId',
    views: {
      'main-view@main': {
        templateUrl: 'views/components/content/regions/regions.tpl.html',
        controller: 'RegionContentCtrl'
      }
    }
  })

  .state('main.app.feed.travel.content.regions.store_detail', {
    url: '/regions/store/:storeId',
    views: {
      'main-view@main': {
        templateUrl: 'views/components/content/regions/store_detail.tpl.html',
        controller: 'StoreContentCtrl'
      }
    }
  })

  .state('main.app.feed.travel.content.store_detail', {
    url: '/store/:storeId',
    views: {
      'main-view@main': {
        templateUrl: 'views/components/content/regions/store_detail.tpl.html',
        controller: 'StoreContentCtrl'
      }
    }
  })

  .state('main.app.liked', {
    url: '/liked',
    views: {
      'app-liked@main.app': {
        templateUrl: 'views/components/liked/liked.tpl.html',
        controller: 'LikedCtrl'
      }
    },
    resolve: {
      lists: function(ListService) {
        return ListService.getUserLists();
      }
    }
  })

  .state('main.app.liked.list-details', {
    url: '/list-details/:listId',
    views: {
      'main-view@main': {
        templateUrl: 'views/components/liked/list-details.tpl.html',
        controller: 'ListDetailsCtrl'
      }
    },
    resolve: {
      list: function(ListService, $stateParams) {
        return ListService.getList($stateParams.listId);
      }
    }
  })

  .state('main.app.liked.new-list', {
    url: '/new-list',
    views: {
      'main-view@main': {
        templateUrl: 'views/components/liked/new-list.tpl.html',
        controller: 'NewListCtrl'
      }
    }
  })

  .state('main.app.account', {
    url: '/account',
    views: {
      'app-account@main.app': {
        templateUrl: 'views/components/account/account.tpl.html',
        controller: 'AccountCtrl',
      }
    },
    authenticate: true
  })

  .state('main.app.account.profile', {
    url: '/profile',
    views: {
      'main-view@main': {
        templateUrl: 'views/components/account/profile.tpl.html',
        controller: 'ProfileCtrl'
      }
    },
    resolve: {
      user: function(ProfileService) {
        return ProfileService.getUserData();
      }
    }
  })

  .state('main.app.account.orders', {
    url: '/orders',
    views: {
      'main-view@main': {
        templateUrl: 'views/components/account/orders.tpl.html',
        controller: 'OrdersCtrl'
      }
    }
  })

  .state('main.app.account.my_appointment', {
    url: '/my-appointment',
    views: {
      'main-view@main': {
        templateUrl: 'views/components/account/my_appointment.tpl.html',
        controller: 'MyAppointmentCtrl'
      }
    },
    resolve: {
      appointments: function(AppointmentsService) {
        return AppointmentsService.getAppointments();
      }
    }
  })

  .state('main.app.account.purchases_review', {
    url: '/purchases-review',
    views: {
      'main-view@main': {
        templateUrl: 'views/components/account/purchases_review.tpl.html',
        controller: 'PurchasesReviewCtrl'
      }
    },
    resolve: {
      purchases: function(PurchasesService) {
        return PurchasesService.getUserPurchases();
      }
    }
  })

  .state('main.app.account.purchases_review.review', {
    url: '/purchases-review/review:product_id',
    views: {
      'main-view@main': {
        templateUrl: 'views/components/account/review.tpl.html',
        controller: 'ReviewCtrl'
      }
    },
    resolve: {
      product: function(FashionService, $stateParams) {
        return FashionService.getProduct($stateParams.product_id);
      }
    }
  })

  .state('main.app.account.my_stores', {
    url: '/my-stores',
    views: {
      'app-account@main.app': {
        templateUrl: 'views/components/account/my_stores.tpl.html',
        controller: 'MyStoresCtrl'
      }
    },
    resolve: {
      stores: function(StoresService) {
        return StoresService.getUserStores();
      }
    }
  })

  .state('main.app.account.my_points', {
    url: '/my-points',
    views: {
      'main-view@main': {
        templateUrl: 'views/components/account/my_points.tpl.html',
        controller: 'MyPointsCtrl'
      }
    },
    resolve: {
      points: function(PointsService) {
        return PointsService.getUserPoints();
      }
    }
  })

  .state('main.app.carts', {
    url: '/carts',
    views: {
      'main-view@main': {
        templateUrl: 'views/components/carts/carts.tpl.html',
        controller: 'CartsCtrl'
      }
    },
    resolve: {
      products: function(ShoppingCartService) {
        return ShoppingCartService.getProducts();
      }
    }
  })

  .state('main.app.carts.shopping-cart', {
    url: '/carts/shopping-cart',
    views: {
      'cart-type@main.app.carts': {
        templateUrl: 'views/components/carts/shopping-cart.tpl.html',
        controller: 'ShoppingCartCtrl'
      }
    },
    resolve: {
      products: function(ShoppingCartService) {
        return ShoppingCartService.getProducts();
      }
    }
  })

  .state('main.app.carts.try-cart', {
    url: '/carts/try-cart',
    views: {
      'cart-type@main.app.carts': {
        templateUrl: 'views/components/carts/try-cart.tpl.html',
        controller: 'TryCartCtrl'
      }
    },
    resolve: {
      products: function(TryCartService) {
        return TryCartService.getProducts();
      },
      user_shipping_addresses: function(CheckoutService) {
        return CheckoutService.getUserShippingAddresses();

      }
    }
  })

  .state('main.app.carts.favorites', {
    url: '/carts/favorites',
    views: {
      'cart-type@main.app.carts': {
        templateUrl: 'views/components/carts/favorites.tpl.html',
        controller: 'FavoritesCtrl'
      }
    },
    resolve: {
      products: function(FavoritesService) {
        return FavoritesService.getProducts();
      }
    }
  })

  .state('main.app.checkout', {
      url: '/checkout',
      views: {
        'main-view@main': {
          templateUrl: 'views/components/checkout/checkout.tpl.html',
          controller: 'CheckoutCtrl'
        }
      },
      resolve: {
        products: function(ShoppingCartService) {
          return ShoppingCartService.getProducts();
        }
      },
      authenticate: true
    })
    .state('main.app.scheduleAppointment', {
      url: '/scheduleAppointment',
      views: {
        'main-view@main': {
          templateUrl: 'views/components/checkout/schedule_appointment.tpl.html',
          controller: 'TryCartCtrl'
        }
      },
      resolve: {
        products: function(TryCartService) {
          return TryCartService.getProducts();
        },
        user_shipping_addresses: function(ShowroomsFactory) {
          return ShowroomsFactory.getShowroomsLists();

        }
      },
      authenticate: true
    })

  .state('main.app.checkout.address', {
    url: '/address',
    views: {
      'main-view@main': {
        templateUrl: 'views/components/checkout/address.tpl.html',
        controller: 'CheckoutAddressCtrl'
      }
    },
    resolve: {
      user_shipping_addresses: function(CheckoutService) {
        return CheckoutService.getUserShippingAddresses();
      }
    }
  })

  .state('main.app.checkout.card', {
    url: '/card',
    views: {
      'main-view@main': {
        templateUrl: 'views/components/checkout/card.tpl.html',
        controller: 'CheckoutCardCtrl'
      }
    },
    resolve: {
      user_credit_cards: function(CheckoutService) {
        return CheckoutService.getUserCreditCards();
      }
    }
  })

  .state('main.app.checkout.promo-code', {
    url: '/promo-code',
    views: {
      'main-view@main': {
        templateUrl: 'views/components/checkout/promo-code.tpl.html',
        controller: 'CheckoutPromoCodeCtrl'
      }
    }
  })

  .state('main.app.checkout.thanks', {
    url: '/thanks',
    views: {
      'main-view@main': {
        templateUrl: 'views/components/checkout/thanks.tpl.html',
        controller: 'ThanksCtrl'
      }
    }
  })

  .state('main.app.showrooms', {
      url: '/showrooms',
      views: {
        'app-showrooms@main.app': {
          templateUrl: 'views/components/showrooms/showrooms.tpl.html',
          controller: 'ShowroomsCtrl'
        }
      }
    })
    .state('main.app.showrooms.showroom-details', {
      url: '/showroom-details/:showroomId',
      views: {
        'main-view@main': {
          templateUrl: 'views/components/showrooms/showroom-details.tpl.html',
          controller: 'ShowroomDetailsCtrl'
        }
      },
      resolve: {
        showroom: function(ShowroomsFactory, $stateParams) {
          return ShowroomsFactory.getShowroom($stateParams.showroomId);
        }
      }
    })

  .state('main.app.showroom-promotions', {
    url: '/showroom-promotions/:showroomId',
    views: {
      'main-view@main': {
        templateUrl: 'views/components/showrooms/showroom-details.tpl.html',
        controller: 'ShowroomDetailsCtrl'
      }
    },
    resolve: {
      showroom: function(ShowroomsFactory, $stateParams) {
        return ShowroomsFactory.getShowroom($stateParams.showroomId);
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  var tutorial_seen = window.localStorage.getItem('tutorial_seen');
  if (tutorial_seen) {
    $urlRouterProvider.otherwise('/main/app/feed/fashion');
  } else {
    $urlRouterProvider.otherwise('/intro/walkthrough-welcome');
    window.localStorage.setItem("tutorial_seen", true);
  }

})

.run(function($ionicPlatform, tmhDynamicLocale, $translate, $cordovaGlobalization,
  availableLanguages, $rootScope, $state, defaultLanguage, $locale, amMoment, AuthService) {

  $rootScope.previousView = [];

  function applyLanguage(language) {
    tmhDynamicLocale.set(language.toLowerCase());
  }

  function getSuitableLanguage(language) {
    for (var index = 0; index < availableLanguages.length; index++) {
      // Here we are comparing by the Language family and not by the Language variant.
      // so if the mobile is on en-US or en-GB, it will look for the first dictionary
      // of the English family (en-US). But it could work for every variant, if we
      // add a dictionary for every one of them, if not is better this way.
      if (availableLanguages[index].split("-")[0].toLowerCase() === language.split("-")[0].toLowerCase()) {
        return availableLanguages[index];
      }
    }
    return defaultLanguage;
  }

  function setLanguage() {
    if (typeof navigator.globalization !== "undefined") {
      $cordovaGlobalization.getPreferredLanguage().then(function (result) {
        var language = getSuitableLanguage(result.value);
        applyLanguage(language);
        window.localStorage.setItem("local_language", language);
        $translate.use(language);
      });
    } else {
      applyLanguage(defaultLanguage);
      window.localStorage.setItem("local_language", defaultLanguage);
    }
  }

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    var last_state = _.last($rootScope.previousView);

    if (last_state && (last_state.fromState === toState.name)) {
      $rootScope.previousView.pop();
    } else {
      $rootScope.previousView.push({
        "fromState": fromState.name,
        "fromParams": fromParams
      });
    }
  });

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    if (toState.authenticate && !AuthService.isAuthenticated()) {
      $state.transitionTo("intro.auth-login");
      event.preventDefault();
    }
  });

  $ionicPlatform.ready(function() {
    setLanguage();

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

    amMoment.changeLocale('en-gb');
  });

  function getSuitableLanguage(language) {
    for (var index = 0; index < availableLanguages.length; index++) {
      // Here we are comparing by the Language family and not by the Language variant.
      // so if the mobile is on en-US or en-GB, it will look for the first dictionary
      // of the English family (en-US). But it could work for every variant, if we
      // add a dictionary for every one of them, if not is better this way.
      if (availableLanguages[index].split("-")[0].toLowerCase() === language.split("-")[0].toLowerCase()) {
        return availableLanguages[index];
      }
    }
    return defaultLanguage;
  }

});
