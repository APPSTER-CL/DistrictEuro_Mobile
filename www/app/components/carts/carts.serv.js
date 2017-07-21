angular.module('districteuro.shopping-cart.services', [])

.service('ShoppingCartService', function ($http, $q, $rootScope){
  this.getProducts = function(){
    return JSON.parse(window.localStorage.districteuro_cart || '[]');
  };

  this.updatedProducts = function(products){
    window.localStorage.districteuro_cart = JSON.stringify(products);

    $rootScope.$broadcast('cart_updated', products);
  };

  this.addProduct = function(productToAdd){
    var cart_products = !_.isUndefined(window.localStorage.districteuro_cart) ? JSON.parse(window.localStorage.districteuro_cart) : [];

    //check if this product is already saved
    var existing_product = _.find(cart_products, function(product){
      return product.id == productToAdd.id;
    });

    if(!existing_product){
      cart_products.push(productToAdd);
      $rootScope.$broadcast('cart_updated', cart_products);
      $rootScope.$emit('cart_updated', cart_products);
    }

    window.localStorage.districteuro_cart = JSON.stringify(cart_products);
  };

  this.removeProduct = function(productToRemove){
    var cart_products = JSON.parse(window.localStorage.districteuro_cart);

    var new_cart_products = _.reject(cart_products, function(product){
      return product.id == productToRemove.id;
    });
    window.localStorage.districteuro_cart = JSON.stringify(new_cart_products);

    $rootScope.$broadcast('cart_updated', new_cart_products);
  };

  this.emptyCart = function(){
    var cart_products = !_.isUndefined(window.localStorage.districteuro_cart) ? JSON.parse(window.localStorage.districteuro_cart) : [];
    if (cart_products)
    {
      window.localStorage.removeItem('districteuro_cart');
      $rootScope.$broadcast('cart_updated', []);
    }
  };

})


.service('TryCartService', function ($http, $q, $rootScope){
  this.getProducts = function(){
    return JSON.parse(window.localStorage.districteuro_trycart || '[]');
  };

  this.updatedProducts = function(products){
    window.localStorage.districteuro_trycart = JSON.stringify(products);

    $rootScope.$broadcast('trycart_updated', products);
  };

  this.addProduct = function(productToAdd){
    var cart_products = !_.isUndefined(window.localStorage.districteuro_trycart) ? JSON.parse(window.localStorage.districteuro_trycart) : [];

    //check if this product is already saved
    var existing_product = _.find(cart_products, function(product){
      return product.id == productToAdd.id;
    });

    if(!existing_product){
      cart_products.push(productToAdd);
      $rootScope.$broadcast('trycart_updated', cart_products);
      $rootScope.$emit('trycart_updated', cart_products);
    }

    window.localStorage.districteuro_trycart = JSON.stringify(cart_products);
  };

  this.removeProduct = function(productToRemove){
    var cart_products = JSON.parse(window.localStorage.districteuro_trycart);

    var new_cart_products = _.reject(cart_products, function(product){
      return product.id == productToRemove.id;
    });
    window.localStorage.districteuro_trycart = JSON.stringify(new_cart_products);

    $rootScope.$broadcast('trycart_updated', new_cart_products);
  };

  this.emptyCart = function(){
    var cart_products = !_.isUndefined(window.localStorage.districteuro_trycart) ? JSON.parse(window.localStorage.districteuro_trycart) : [];
    if (cart_products)
    {
      window.localStorage.removeItem('districteuro_trycart');
      $rootScope.$broadcast('trycart_updated', []);
    }
  };

})

.service('FavoritesService', function ($http, $q, $rootScope){
  this.getProducts = function(){
    return JSON.parse(window.localStorage.districteuro_favorites || '[]');
  };

  this.updatedProducts = function(products){
    window.localStorage.districteuro_favorites = JSON.stringify(products);

    $rootScope.$broadcast('favorites_updated', products);
  };

  this.addProduct = function(productToAdd){
    var cart_products = !_.isUndefined(window.localStorage.districteuro_favorites) ? JSON.parse(window.localStorage.districteuro_favorites) : [];

    //check if this product is already saved
    var existing_product = _.find(cart_products, function(product){
      return product.id == productToAdd.id;
    });

    if(!existing_product){
      cart_products.push(productToAdd);
      $rootScope.$broadcast('favorites_updated', cart_products);
      $rootScope.$emit('favorites_updated', cart_products);
    }

    window.localStorage.districteuro_favorites = JSON.stringify(cart_products);
  };

  this.removeProduct = function(productToRemove){
    var cart_products = JSON.parse(window.localStorage.districteuro_favorites);

    var new_cart_products = _.reject(cart_products, function(product){
      return product.id == productToRemove.id;
    });
    window.localStorage.districteuro_favorites = JSON.stringify(new_cart_products);

    $rootScope.$broadcast('favorites_updated', new_cart_products);
  };

  this.emptyCart = function(){
    var cart_products = !_.isUndefined(window.localStorage.districteuro_favorites) ? JSON.parse(window.localStorage.districteuro_favorites) : [];
    if (cart_products)
    {
      window.localStorage.removeItem('districteuro_favorites');
      $rootScope.$broadcast('favorites_updated', []);
    }
  };

})

;
