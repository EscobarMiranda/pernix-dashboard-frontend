(function() {
  'use strict';

  angular
    .module('app.resource')
    .constant('RESOURCE', {
      'API_URL': 'http://localhost:9090/rest/',
      'SCALE' : [1,2,3,4,5],
      'PALETTE' : [
        'RED',
        'RED',
        'RED',
        'RED',
        'RED',
        'RED',
        'YELLOW',
        'YELLOW',
        'GREEN',
        'GREEN',
        'GREEN'
        ],
      'GOOGLE_CLIENT_ID':
        '677278398565-ldsfl0j55hl0aihs280hitt2qtrvd6an.apps.googleusercontent.com',
      'filterName': 'date',
      'formatDate': 'yyyy/MM/dd'

    });

})();
