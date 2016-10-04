(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('DeleteManagerController', DeleteManagerController);

  DeleteManagerController.$inject = [
    'ManagerService',
    'manager',
    'managers',
    '$uibModalInstance',
    'ngNotify'
    ];

  /* @ngInject */
  function DeleteManagerController(
    ManagerService,
    manager,
    managers,
    $uibModalInstance,
    ngNotify) {
    var vm = this;
    vm.manager = manager;
    vm.managers = managers;
    vm.close = close;
    vm.deleteManager = deleteManager;

    activate();

    function activate() {

    }

    function close() {
      $uibModalInstance.dismiss('cancel');
    }

    function deleteManager() {
      ManagerService.deleteManager(vm.manager)
        .then(function(data) {
          vm.managers.splice(vm.managers.indexOf(vm.manager), 1);
          ngNotify.set('Manager has been deleted successfully', 'success');
        })
        .catch(function(error) {
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      close();
    }

  }

})();
