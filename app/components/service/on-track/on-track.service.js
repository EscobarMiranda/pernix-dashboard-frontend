(function() {
  'use strict';

  angular
    .module('app.service')
    .service('OnTrackService', OnTrackService);

  /* @ngInject */
  function OnTrackService($http, RESOURCE) {
    this.getOnTrack = getOnTrack;

    function getOnTrack() {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'onTrack',
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return $http(request);
    }

  }

})();
