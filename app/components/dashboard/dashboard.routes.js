(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .config(routesConfiguration);

  /* @ngInject */
  function routesConfiguration($stateProvider) {
    $stateProvider
      .state('home.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/components/dashboard/dashboard.html',
        controller: 'DashboardController as vm'
      });
  }
})();
