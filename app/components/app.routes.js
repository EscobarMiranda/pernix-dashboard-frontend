(function() {
  'use strict';

  angular
    .module('app')
    .config(routesConfiguration);

  /* @ngInject */
  function routesConfiguration($urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
  }

})();
