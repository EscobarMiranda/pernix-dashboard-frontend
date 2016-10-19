(function() {
  'use strict';

  angular
    .module('app.service')
    .service('ProjectService', ProjectService);

  /* @ngInject */
  function ProjectService($http, RESOURCE) {

    this.getProjects = getProjects;
    this.getProjectsByUser = getProjectsByUser;
    this.getProject = getProject;
    this.createProject = createProject;
    this.updateProject = updateProject;
    this.changeStateProject = changeStateProject;

    function getProjects() {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'project',
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return $http(request);
    }

    function getProjectsByUser(user) {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'project/byUser/' + user.id,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return $http(request);
    }

    function getProject(project) {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'project/' + project.id,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return $http(request);
    }

    function createProject(project) {
      var postRequest = {
        method: 'POST',
        url:  RESOURCE.API_URL + 'project',
        headers: {
          'Content-Type': 'application/json'
        },
        data: project
      };

      return $http(postRequest);
    }

    function updateProject(project) {
      var postRequest = {
        method: 'PUT',
        url:  RESOURCE.API_URL + 'project',
        headers: {
          'Content-Type': 'application/json'
        },
        data: project
      };

      return $http(postRequest);
    }

    function changeStateProject(project) {
      var postRequest = {
        method: 'PUT',
        url:  RESOURCE.API_URL + 'project/changeState',
        headers: {
          'Content-Type': 'application/json'
        },
        data: project
      };

      return $http(postRequest);
    }

  }

})();
