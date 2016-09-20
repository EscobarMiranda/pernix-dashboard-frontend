(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('AdminManagerController', AdminManagerController);

  /* @ngInject */
  function AdminManagerController($uibModal) {
    var vm = this;
    vm.createManager = createManager;
    vm.updateManager = updateManager;
    vm.deleteManager = deleteManager;

    activate();

    function activate() {

    }

    function createManager() {
      $uibModal.open({
        templateUrl: 'app/components/admin/manager/create/create.html',
        controller: 'CreateManagerController as vm'
      });
    }

    function updateManager() {
      $uibModal.open({
        templateUrl: 'app/components/admin/manager/update/update.html',
        controller: 'UpdateManagerController as vm'
      });
    }

    function deleteManager() {
      $uibModal.open({
        templateUrl: 'app/components/admin/manager/delete/delete.html',
        controller: 'DeleteManagerController as vm'
      });
    }

  }

})();
