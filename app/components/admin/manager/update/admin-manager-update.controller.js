(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('UpdateManagerController', UpdateManagerController);

  /* @ngInject */
  function UpdateManagerController(
      ManagerService,
      CompanyService,
      $uibModalInstance,
      manager,
      ngNotify) {
    var vm = this;
    vm.manager = manager;
    vm.company = manager.company;
    vm.companies = [];
    vm.close = close;
    vm.updateManager = updateManager;

    activate();
    getCompanies();

    function activate() {

    }

    function close() {
      $uibModalInstance.dismiss('cancel');
    }

    function getCompanies() {
      CompanyService.getCompanies()
        .then(function(companiesData) {
          vm.companies = companiesData.data;
        })
        .catch(function(error) {
          ngNotify.set('Error loading companies', 'error');
        });
    }

    function updateManager() {
      vm.manager.company = JSON.parse(vm.company);
      ManagerService.updateManager(vm.manager)
        .then(function(data) {
          vm.manager = {};
          ngNotify.set('Manager has been updated successfully', 'success');
        })
        .catch(function(error) {
          vm.manager = {};
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      close();
    }

  }

})();
