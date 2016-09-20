(function() {
  'use strict';

  angular
    .module('app.admin')
    .config(routesConfiguration);

  /* @ngInject */
  function routesConfiguration($stateProvider) {
    $stateProvider
      .state('home.company', {
        url: '/admin/company',
        templateUrl: 'app/components/admin/company/admin-company.html',
        controller: 'AdminCompanyController as vm'
      });
  }
})();
