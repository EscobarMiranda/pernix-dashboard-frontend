(function() {
  'use strict';

  angular
    .module('app.resource')
    .constant('RESOURCE', {
      'API_URL': 'http://localhost:9090/rest/',
      'SCALE' : [1,2,3,4,5],
      'PALETTE' : [
        '#FF0000',
        '#FF0000',
        '#FF0000',
        '#FF0000',
        '#FF0000',
        '#FF0000',
        '#FF0000',
        '#7CE308',
        '#7CE308',
        '#00C803',
        '#0C8000'
        ],
      'GOOGLE_CLIENT_ID':
        '677278398565-ldsfl0j55hl0aihs280hitt2qtrvd6an.apps.googleusercontent.com'

    });

})();
