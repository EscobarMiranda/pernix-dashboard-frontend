(function() {
  'use strict';

  angular
    .module('app.service')
    .service('UserService', UserService);

  UserService.$inject = ['$http', 'RESOURCE'];

  /* @ngInject */
  function UserService($http, RESOURCE, $window) {

    this.getUserTypes = getUserTypes;
    this.getUsers = getUsers;
    this.getUser = getUser;
    this.createUser = createUser;
    this.updateUser = updateUser;
    this.setCurrentUser = setCurrentUser;
    this.getCurrentUser = getCurrentUser;
    this.clearCurrentUser = clearCurrentUser;
    this.changeStateUser = changeStateUser;

    function getUserTypes() {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'userType',
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return $http(request);
    }

    function getUsers() {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'user',
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return $http(request);
    }

    function getUser(user) {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'user/' + user.id,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return $http(request);
    }

    function createUser(user) {
      var postRequest = {
        method: 'POST',
        url:  RESOURCE.API_URL + 'user',
        headers: {
          'Content-Type': 'application/json'
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
          'Content-Type': 'application/json'
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
          'Content-Type': 'application/json'
        },
        data: user
      };

      return $http(postRequest);
    }

    function setCurrentUser(user) {
      sessionStorage.setItem("CurrentUser", JSON.stringify(user));
    }

    function getCurrentUser() {
      return JSON.parse(sessionStorage.getItem("CurrentUser"));
    }

    function clearCurrentUser() {
      setCurrentUser({});
    }

  }

})();
