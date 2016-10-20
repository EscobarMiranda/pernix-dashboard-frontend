(function() {
  'use strict';

  angular
    .module('app')
    .config(configuration);

  /* @ngInject */
  function configuration(RESOURCE, $locationProvider, GoogleSigninProvider) {
    GoogleSigninProvider.init({
      client_id: RESOURCE.GOOGLE_CLIENT_ID
    });
  }

})();
