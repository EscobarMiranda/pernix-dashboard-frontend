(function() {
  'use strict';

  angular
    .module('app.home')
    .config(routesConfiguration);

  /* @ngInject */
  function routesConfiguration($stateProvider) {

    $stateProvider
      .state('home', {
        templateUrl: 'app/components/home/home.html'
      });

  }

})();
