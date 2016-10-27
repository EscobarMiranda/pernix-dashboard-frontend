(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('AdminProjectController', AdminProjectController);

  /* @ngInject */
  function AdminProjectController($state, UserService, ProjectService, $uibModal, ngNotify) {
    var vm = this;
    vm.projects = [];
    vm.createProject = createProject;
    vm.updateProject = updateProject;
    vm.deleteProject = deleteProject;
    vm.isAdmin = UserService.getPermissions();
    vm.user = UserService.getCurrentUser();

    showProjects();

    function showProjects() {
      UserService.islogged();
      if (vm.isAdmin) {
        getProjects();
      }
      getProjectsByUser();
    }

    function getProjects() {
      ProjectService.getProjects()
        .then(function(projectsData) {
          vm.projects = projectsData.data;
        })
        .catch(function(error) {
          ngNotify.set('Error loading project', 'error');
        });
    }

    function getProjectsByUser(user) {
      ProjectService.getProjectsByUser(vm.user)
        .then(function(projectsData) {
          vm.projects = projectsData.data;
        })
        .catch(function(error) {
          ngNotify.set('Error loading project', 'error');
        });
    }

    function createProject() {
      $uibModal.open({
        templateUrl: 'app/components/admin/project/create/create.html',
        controller: 'CreateProjectController as vm',
        resolve: {
          projects: function() {
            return vm.projects;
          }
        }
      });
    }

    function updateProject(project) {
      $uibModal.open({
        templateUrl: 'app/components/admin/project/update/update.html',
        controller: 'UpdateProjectController as vm',
        resolve: {
          project: function() {
            return project;
          }
        }
      });
    }

    function deleteProject(project) {
      $uibModal.open({
        templateUrl: 'app/components/admin/project/delete/delete.html',
        controller: 'DeleteProjectController as vm',
        resolve: {
          project: function() {
            return project;
          }
        }
      });
    }

  }

})();
