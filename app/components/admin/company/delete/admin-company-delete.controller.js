(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('DeleteCompanyController', DeleteCompanyController);

  DeleteCompanyController.$inject = [
    'CompanyService',
    '$uibModalInstance',
    'company',
    'ngNotify'
  ];

  /* @ngInject */
  function DeleteCompanyController(
      CompanyService,
      $uibModalInstance,
      company,
      ngNotify) {
    var vm = this;
    vm.close = close;
    vm.company = company;
    vm.deleteCompany = deleteCompany;

    activate();

    function activate() {

    }

    function close() {
      $uibModalInstance.dismiss('cancel');
    }

    function deleteCompany() {
      CompanyService.changeStateCompany(vm.company)
        .then(function(data) {
          vm.company.active = !vm.company.active;
          ngNotify.set('Company has been updated successfully', 'success');
        })
        .catch(function(error) {
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      close();
    }

  }

})();
