(function() {
  'use strict';

  angular
    .module('app.service')
    .service('ObjectService', ObjectService);

  /* @ngInject */
  function ObjectService() {

    this.parseObject = parseObject;

    function parseObject(data) {
      if (typeof(data) === 'string') {
        return JSON.parse(data);
      }
      return data;
    }

  }

})();
