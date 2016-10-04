(function() {
  'use strict';

  angular
    .module('app.resource')
    .constant('RESOURCE', {
      'API_URL': 'http://localhost:9090/rest/',
      'SCALE' : [1,2,3,4,5]
    });

})();
