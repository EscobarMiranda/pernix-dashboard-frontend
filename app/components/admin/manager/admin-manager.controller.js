(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('AdminManagerController', AdminManagerController);

  AdminManagerController.$inject = ['ManagerService', '$uibModal', 'ngNotify'];

  /* @ngInject */
  function AdminManagerController(ManagerService, $uibModal, ngNotify) {
    var vm = this;
    vm.managers = [];
    vm.createManager = createManager;
    vm.updateManager = updateManager;
    vm.deleteManager = deleteManager;

    activate();
    getManagers();

    function activate() {

    }

    function getManagers() {
      ManagerService.getManagers()
        .then(function(managersData) {
          vm.managers = managersData.data;
        })
        .catch(function(error) {
          ngNotify.set('Error loading managers', 'error');
        });
    }

    function createManager() {
      $uibModal.open({
        templateUrl: 'app/components/admin/manager/create/create.html',
        controller: 'CreateManagerController as vm',
        resolve: {
          managers: function() {
            return vm.managers;
          }
        }
      });
    }

    function updateManager(manager) {
      $uibModal.open({
        templateUrl: 'app/components/admin/manager/update/update.html',
        controller: 'UpdateManagerController as vm',
        resolve: {
          manager: function() {
            return manager;
          }
        }
      });
    }

    function deleteManager(manager) {
      $uibModal.open({
        templateUrl: 'app/components/admin/manager/delete/delete.html',
        controller: 'DeleteManagerController as vm',
        resolve: {
          manager: function() {
            return manager;
          }
        }
      });
    }

  }

})();
