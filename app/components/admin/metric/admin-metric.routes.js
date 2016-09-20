(function() {
  'use strict';

  angular
    .module('app.admin')
    .config(routesConfiguration);

  /* @ngInject */
  function routesConfiguration($stateProvider) {
    $stateProvider
      .state('home.metric', {
        url: '/admin/metric',
        templateUrl: 'app/components/admin/metric/admin-metric.html',
        controller: 'AdminMetricController as vm'
      });
  }
})();
