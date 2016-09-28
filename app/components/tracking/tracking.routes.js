(function() {
  'use strict';

  angular
    .module('app.tracking')
    .config(routesConfiguration);

  /* @ngInject */
  function routesConfiguration($stateProvider) {
    $stateProvider
      .state('home.tracking', {
        url: '/tracking',
        templateUrl: 'app/components/tracking/tracking.html',
        controller: 'TrackingController as vm'
      });
  }
})();
