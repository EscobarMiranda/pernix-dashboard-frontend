(function() {
  'use strict';

  angular
    .module('app')
    .config(configuration);

  /* @ngInject */
  function configuration(RESOURCE, $locationProvider, GoogleSigninProvider) {
    $locationProvider.html5Mode(true);

    GoogleSigninProvider.init({
      client_id: RESOURCE.GOOGLE_CLIENT_ID
    });
  }

})();
