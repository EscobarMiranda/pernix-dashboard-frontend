(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('UpdateCompanyController', UpdateCompanyController);

  UpdateCompanyController.$inject = [
    'CompanyService',
    '$uibModalInstance',
    'company',
    'ngNotify'
    ];

  /* @ngInject */
  function UpdateCompanyController(
      CompanyService,
      $uibModalInstance,
      company,
      ngNotify) {
    var vm = this;
    vm.close = close;
    vm.company = company;
    vm.updateCompany = updateCompany;

    activate();

    function activate() {

    }

    function close() {
      $uibModalInstance.dismiss('cancel');
    }

    function updateCompany() {
      CompanyService.updateCompany(vm.company)
        .then(function(data) {
          vm.company = {};
          ngNotify.set('Company has been updated successfully', 'success');
        })
        .catch(function(error) {
          vm.company = {};
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      close();
    }

  }

})();