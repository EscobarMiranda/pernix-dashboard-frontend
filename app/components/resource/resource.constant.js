(function() {
  'use strict';

  angular
    .module('app.resource')
    .constant('RESOURCE', {
      'API_URL': 'http://pernix-dashboard-backend.herokuapp.com/rest/',
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
      'formatDate': 'yyyy/MM/dd',
      'ICONSET': [
        {icon: 'ra-medium reaction-happy', rating: 5, name:'Happy'},
        {icon: 'ra-medium reaction-smile', rating: 4, name:'Good'},
        {icon: 'ra-medium reaction-neutral', rating: 3, name:'OK'},
        {icon: 'ra-medium reaction-sad', rating: 2, name:'Bad'},
        {icon: 'ra-medium reaction-frustrated', rating: 1, name:'Frustrated'}
        ]

    });

})();
