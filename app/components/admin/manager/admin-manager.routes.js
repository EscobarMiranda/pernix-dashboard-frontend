(function() {
  'use strict';

  angular
    .module('app.admin')
    .config(routesConfiguration);

  /* @ngInject */
  function routesConfiguration($stateProvider) {
    $stateProvider
      .state('home.manager', {
        url: '/admin/manager',
        templateUrl: 'app/components/admin/manager/admin-manager.html',
        controller: 'AdminManagerController as vm'
      });
  }
})();
