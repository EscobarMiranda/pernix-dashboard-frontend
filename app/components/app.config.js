(function() {
  'use strict';

  angular
    .module('app')
    .config(configuration);

  /* @ngInject */
  function configuration($locationProvider) {
    $locationProvider.html5Mode(true);
  }

})();
