angular.module('districteuro.feed.services', [])

.service('FashionService', function ($http,configuration, $rootScope, $state, StorageService, $q, $filter){

  var send_get = function(url, params) {
    var getProducts_deferred = $q.defer();
    $http({
      url: url,
      method: "GET",
      params: params
    }).success(function(res, status, headers, config) {
      getProducts_deferred.resolve(res);
    }).error(function(error, status, headers, config) {
      getProducts_deferred.reject({
        'error': error,
        'status': status
      });
    });
    return getProducts_deferred.promise;
  };

  this.loadMoreProducts = function(nextPageUrl) {
        if(nextPageUrl!=null){
            return send_get(nextPageUrl)
        }
        //done(); // need to call this when finish loading more data
  };

  this.getProducts = function(){
    var url = configuration.webApi.products.get_products;

    var dict_params = {};

    var query = StorageService.get(configuration.storage.search_query);
    if (query && query.length > 0) {
      dict_params = {
        search: query
      }
    } else {
      var filters = StorageService.get(configuration.storage.filters);
      if (filters) {
        filters = JSON.parse(filters);
        if(filters.country_filter){
          dict_params.country = filters.country_filter;
        }
        if(filters.category_filter){
          dict_params.search = filters.category_filter;
        }
        if(filters.price_filter){

        }
      }
    }
    if (!dict_params) {
      dict_params = {
        ordering: '-date_approved'
      };
    }

    return send_get(url, dict_params);
  };

  this.getBestSellers = function() {
    var params = {
      ordering: '-sold_quantity'
    };
    return send_get(configuration.webApi.products.get_products, params);
  };

  var getProductReviews= function(product_id){
      var dfd = $q.defer();
      $http.get('logged_user_db.json').success(function(database) {
        var reviews = _.filter(database.user.reviews, function(r){ return r.product_id == product_id; });
        dfd.resolve(reviews);
      });
      return dfd.promise;
  };

  this.getProduct = function(prodId){
    var getProductDetail_deferred = $q.defer();
    $http({
      url: configuration.webApi.products.get_products + prodId + "/",
      method: "GET",
      cache: true
    }).success(function(res, status, headers, config) {

        res["is_in_try_on"] = $filter('filter')(JSON.parse(window.localStorage.districteuro_trycart || '[]'), {id: prodId})[0];
        res["is_in_favorites"] = $filter('filter')(JSON.parse(window.localStorage.districteuro_favorites || '[]'), {id: prodId})[0];
        res["is_in_cart"] = $filter('filter')(JSON.parse(window.localStorage.districteuro_cart || '[]'), {id: prodId})[0];
        console.log(res);
        getProductReviews(prodId).then(function(reviews){
            res["reviews"] = reviews;
          }, function(error){
            console.log("ups", error);
          });
        getProductDetail_deferred.resolve(res);
    }).error(function(error, status, headers, config) {
        getProductDetail_deferred.reject({'error': error,'status': status});
    });
    return getProductDetail_deferred.promise;
  };


})

.service('TravelService', function ($http,configuration, $rootScope, $state, StorageService, $q){

    function _send_get(url, params) {
      var getObjects_deferred = $q.defer();
      params.method = 'GET';
      params.url = url;
      $http(params).success(function(res, status, headers, config) {
        getObjects_deferred.resolve(res);
      }).error(function(error, status, headers, config) {
        getObjects_deferred.reject({
          'error': error,
          'status': status
        });
      });
      return getObjects_deferred.promise;
    };

    function send_get(url, params) {
      return _send_get(url, {params: params});
    }

    function send_get_cached(url, params) {
      return _send_get(url, {params: params, cache: true});
    }

    this.getCountries = function(query_params){
      var url = configuration.webApi.countries.get_countries;
      if (query_params !== undefined)
      {
          url += "?" + query_params;
      }
      return send_get_cached(url);
    };

    this.getRegions = function(countryId){
      var url = configuration.webApi.countries.get_countries+countryId+"/regions/";
      return send_get(url);
    };
    this.getCountry = function(countryId){
      var url = configuration.webApi.countries.get_countries+countryId;
      return send_get_cached(url);
    };
    this.getClassicProducts = function(countryId){
      var url = configuration.webApi.countries.get_countries+countryId+"/popular-products/";
      return send_get(url);
    };
    this.getPopularStores = function(countryId){
      var params = {
        country: countryId,
        ordering: '-popularity'
      }
      var url = configuration.webApi.stores.get_stores;
      return send_get(url, params);
    };

    this.getRegionDetails = function(regionId){
      var url = configuration.webApi.countries.get_region_details+regionId;
      return send_get(url);
    };
    this.getStoreDetail = function(storeId){
      var url = configuration.webApi.stores.get_stores+storeId;
      return send_get(url);
    };

    this.getStoresProducts = function(storeId){
      var url = configuration.webApi.products.get_products+"?store="+storeId;
      return send_get(url);
    };


});
