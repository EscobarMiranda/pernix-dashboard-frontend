(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('DeleteProjectController', DeleteProjectController);

  /* @ngInject */
  function DeleteProjectController(ProjectService,
                                   project,
                                   $uibModalInstance,
                                   ngNotify) {
    var vm = this;
    vm.project = project;
    vm.closeModal = closeModal;
    vm.deleteProject = deleteProject;

    function closeModal() {
      $uibModalInstance.dismiss('cancel');
    }

    function deleteProject() {
      ProjectService.changeStateProject(vm.project)
        .then(function(data) {
          vm.project.active = !vm.project.active;
          ngNotify.set('Project has been updated successfully', 'success');
        })
        .catch(function(error) {
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      closeModal();
    }

  }

})();
