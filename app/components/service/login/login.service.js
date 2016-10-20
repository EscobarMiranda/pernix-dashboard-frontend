(function() {
  'use strict';

  angular
    .module('app.service')
    .service('LoginService', LoginService);

  /* @ngInject */
  function LoginService($http, RESOURCE) {
    this.getUser = getUser;

    function getUser(loginObject) {
      var postRequest = {
        method: 'POST',
        url:  RESOURCE.API_URL + 'login',
        headers: {
          'Content-Type': 'application/json'
        },
        data: loginObject
      };

      return $http(postRequest);
    }
  }

})();
