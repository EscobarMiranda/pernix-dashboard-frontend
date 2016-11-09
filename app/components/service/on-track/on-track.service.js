(function() {
  'use strict';

  angular
    .module('app.service')
    .service('OnTrackService', OnTrackService);

  /* @ngInject */
  function OnTrackService(UserService, $http, RESOURCE, $base64) {
    this.getOnTrack = getOnTrack;

    function getOnTrack() {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'onTrack',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': UserService.getAuthorization()
        }
      };

      return $http(request);
    }

  }

})();
