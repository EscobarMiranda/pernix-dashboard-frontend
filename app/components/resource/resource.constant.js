(function() {
  'use strict';

  angular
    .module('app.resource')
    .constant('RESOURCE', {
      'API_URL': 'http://localhost:9090/rest/',
      'SCALE' : [1,2,3,4,5],
      'PALETTE' : [
        '#FF0000',
        '#E33308',
        '#E34008',
        '#E35408',
        '#E36C08',
        '#E38D08',
        '#E3C208',
        '#E0E308',
        '#7CE308',
        '#00C803',
        '#0C8000'
        ]
    });

})();
