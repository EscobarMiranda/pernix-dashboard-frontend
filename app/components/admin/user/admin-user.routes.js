(function() {
  'use strict';

  angular
    .module('app.admin')
    .config(routesConfiguration);

  /* @ngInject */
  function routesConfiguration($stateProvider) {
    $stateProvider
      .state('home.user', {
        url: '/admin/user',
        templateUrl: 'app/components/admin/user/admin-user.html',
        controller: 'AdminUserController as vm'
      });
  }
})();
