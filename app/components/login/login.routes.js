(function() {
  'use strict';

  angular
    .module('app.login')
    .config(routesConfiguration);

  /* @ngInject */
  function routesConfiguration($stateProvider) {

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/components/login/login.html',
        controller: 'LoginController as vm'
      });

  }

})();
