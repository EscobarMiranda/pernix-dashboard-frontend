(function() {
  'use strict';

  angular
    .module('app.layout')
    .component('project', {
      templateUrl: 'app/components/layout/project/project-tpl.html',
      controller: 'ProjectController as vm'
    });
})();
