(function() {
  'use strict';

  angular
    .module('app')
    .config(configuration);

  /* @ngInject */
  function configuration(RESOURCE, GoogleSigninProvider) {
    GoogleSigninProvider.init({
      client_id: RESOURCE.GOOGLE_CLIENT_ID
    });
  }

})();
