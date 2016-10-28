(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('DeleteManagerController', DeleteManagerController);

  /* @ngInject */
  function DeleteManagerController(
      ManagerService,
      manager,
      $uibModalInstance,
      ngNotify) {
    var vm = this;
    vm.manager = manager;
    vm.close = close;
    vm.deleteManager = deleteManager;

    function close() {
      $uibModalInstance.dismiss('cancel');
    }

    function deleteManager() {
      ManagerService.changeStateManager(vm.manager)
        .then(function(data) {
          vm.manager.active = !vm.manager.active;
          ngNotify.set('Manager has been updated successfully', 'success');
        })
        .catch(function(error) {
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      close();
    }

  }

})();
