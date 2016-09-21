(function() {
  'use strict';

  angular
    .module('app.login')
    .config(routesConfiguration);

  /* @ngInject */
  function routesConfiguration($stateProvider) {

    $stateProvider
      .state('form', {
        url: '/form',
        templateUrl: 'app/components/form/form.html',
        controller: 'FormController as vm'
      });

  }

})();
