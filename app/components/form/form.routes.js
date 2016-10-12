(function() {
  'use strict';

  angular
    .module('app.login')
    .config(routesConfiguration);

  /* @ngInject */
  function routesConfiguration($stateProvider) {

    $stateProvider
      .state('form', {
        url: '/form/:surveyId/:userId',
        templateUrl: 'app/components/form/form.html',
        controller: 'FormController as vm'
      })
      .state('thanks', {
        url: '/thanks',
        templateUrl: 'app/components/form/thanks.html'
      });

  }

})();
