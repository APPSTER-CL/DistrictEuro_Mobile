angular.module('districteuro.providers', [])

.provider("configuration", function () {
    var self = this;

    self.configuration = window.configuration;
    //delete window.configuration;

    self.$get = function () {
        return self.configuration;
    };
});
