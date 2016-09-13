(function() {
  'use strict';

  angular
    .module('app.admin')
    .config(routesConfiguration);

  /* @ngInject */
  function routesConfiguration($stateProvider) {
    $stateProvider
      .state('home.admin', {
        url: '/admin',
        templateUrl: 'app/components/admin/admin.html',
        controller: 'AdminController as vm'
      });
  }
})();
