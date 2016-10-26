(function() {
  'use strict';

  angular
    .module('app.admin')
    .config(routesConfiguration);

  /* @ngInject */
  function routesConfiguration($stateProvider) {
    $stateProvider
      .state('home.project', {
        url: '/admin/project',
        templateUrl: 'app/components/admin/project/admin-project.html',
        controller: 'AdminProjectController as vm'
      });
  }
})();
