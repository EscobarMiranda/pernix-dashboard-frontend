(function() {
  'use strict';

  angular
    .module('app.service')
    .service('UserService', UserService);

  /* @ngInject */
  function UserService($http, RESOURCE, $window, $state, ngNotify, $base64) {
    this.getUserTypes = getUserTypes;
    this.getUserTypeByName = getUserTypeByName;
    this.getUsers = getUsers;
    this.getUser = getUser;
    this.createUser = createUser;
    this.updateUser = updateUser;
    this.setCurrentUser = setCurrentUser;
    this.getCurrentUser = getCurrentUser;
    this.clearCurrentUser = clearCurrentUser;
    this.changeStateUser = changeStateUser;
    this.setCurrentAdminId = setCurrentAdminId;
    this.getCurrentAdminId = getCurrentAdminId;
    this.getPermissions = getPermissions;
    this.verifyCredentials = verifyCredentials;
    this.getAuthorization = getAuthorization;

    function getUserTypes() {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'userType',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getAuthorization()
        }
      };

      return $http(request);
    }

    function getUserTypeByName(name) {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'userType/byName/' + name,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getAuthorization()
        }
      };

      return $http(request);
    }

    function getUsers() {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'user',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getAuthorization()
        }
      };

      return $http(request);
    }

    function getUser(user) {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'user/' + user.id,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getAuthorization()
        }
      };

      return $http(request);
    }

    function createUser(user) {
      var postRequest = {
        method: 'POST',
        url:  RESOURCE.API_URL + 'user',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getAuthorization()
        },
        data: user
      };

      return $http(postRequest);
    }

    function updateUser(user) {
      var postRequest = {
        method: 'PUT',
        url:  RESOURCE.API_URL + 'user',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getAuthorization()
        },
        data: user
      };

      return $http(postRequest);
    }

    function changeStateUser(user) {
      var postRequest = {
        method: 'PUT',
        url:  RESOURCE.API_URL + 'user/changeState',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getAuthorization()
        },
        data: user
      };

      return $http(postRequest);
    }

    function setCurrentUser(user) {
      sessionStorage.setItem('CurrentUser', JSON.stringify(user));
    }

    function getCurrentUser() {
      return JSON.parse(sessionStorage.getItem('CurrentUser'));
    }

    function clearCurrentUser() {
      setCurrentUser(null);
    }

    function setCurrentAdminId(userType) {
      sessionStorage.setItem('CurrentAdminId', JSON.stringify(userType));
    }

    function getCurrentAdminId() {
      return JSON.parse(sessionStorage.getItem('CurrentAdminId'));
    }

    function getPermissions() {
      return getCurrentUser().userType.id == getCurrentAdminId().id;
    }

    function verifyCredentials() {
      if (getCurrentUser() == null) {
        ngNotify.set('session required', 'error');
        $state.go('login');
      }
    }

    function getAuthorization() {
      var user = getCurrentUser();
      return 'Basic ' + $base64.encode(user.email + ':' + user.password);
    }

  }

})();
