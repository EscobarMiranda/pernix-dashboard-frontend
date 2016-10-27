(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller(
      'ProjectController',
      ProjectController
      );

  /* @ngInject */
  function ProjectController(ProjectService, ngNotify) {
    var vm = this;
    vm.projects = [];
    vm.datapoints = [];
    vm.datacolumns = [{'id': 'top-1', 'type': 'bar', 'name': 'Projects'}];
    vm.datax = {'id': 'x'};

    getProjects();

    function getProjects() {
      var tmpList = [];
      ProjectService.getProjects()
        .then(function(projectsData) {
          vm.projects = projectsData.data;
          _.forEach(projectsData.data, function(value, key) {
            vm.datapoints.push({'x': value.name + ' - ' + value.onTrack.name, 'top-1': value.percentage});
          });
        })
        .catch(function(error) {
          ngNotify.set('Error loading projects', 'error');
        });
    }
  }
})();
