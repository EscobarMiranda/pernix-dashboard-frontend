(function() {
  'use strict';

  angular
    .module('app.service')
    .service('ManagerService', ManagerService);

  ManagerService.$inject = ['$http', 'RESOURCE'];

  /* @ngInject */
  function ManagerService($http, RESOURCE) {

    this.getManagers = getManagers;
    this.getManager = getManager;
    this.createManager = createManager;
    this.updateManager = updateManager;
    this.changeStateManager = changeStateManager;

    function getManagers() {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'manager',
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return $http(request);
    }

    function getManager(manager) {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'manager/' + manager.id,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return $http(request);
    }

    function createManager(manager) {
      var postRequest = {
        method: 'POST',
        url:  RESOURCE.API_URL + 'manager',
        headers: {
          'Content-Type': 'application/json'
        },
        data: manager
      };

      return $http(postRequest);
    }

    function updateManager(manager) {
      var postRequest = {
        method: 'PUT',
        url:  RESOURCE.API_URL + 'manager',
        headers: {
          'Content-Type': 'application/json'
        },
        data: manager
      };

      return $http(postRequest);
    }

    function changeStateManager(manager) {
      var postRequest = {
        method: 'PUT',
        url:  RESOURCE.API_URL + 'manager/changeState',
        headers: {
          'Content-Type': 'application/json'
        },
        data: manager
      };

      return $http(postRequest);
    }

  }

})();
