(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('CreateManagerController', CreateManagerController);

  CreateManagerController.$inject = [
    'ManagerService',
    'CompanyService',
    'managers',
    '$uibModalInstance',
    'ngNotify'
    ];

  /* @ngInject */
  function CreateManagerController(
    ManagerService,
    CompanyService,
    managers,
    $uibModalInstance,
    ngNotify) {
    var vm = this;
    vm.managers = managers;
    vm.company = {};
    vm.companies = [];
    vm.close = close;
    vm.createManager = createManager;

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
          vm.companies = [];
          ngNotify.set('Error loading companies', 'error');
        });
    }

    function createManager() {
      vm.manager.company = JSON.parse(vm.company);
      ManagerService.createManager(vm.manager)
        .then(function(data) {
          vm.managers.push(vm.manager);
          vm.manager = {};
          ngNotify.set('Manager has been created successfully', 'success');
        })
        .catch(function(error) {
          vm.manager = {};
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      close();
    }

  }

})();
