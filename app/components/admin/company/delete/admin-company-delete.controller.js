(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('DeleteCompanyController', DeleteCompanyController);

  DeleteCompanyController.$inject = [
    'CompanyService',
    '$uibModalInstance',
    'company',
    'companies',
    'ngNotify'
    ];

  /* @ngInject */
  function DeleteCompanyController(
      CompanyService,
      $uibModalInstance,
      company,
      companies,
      ngNotify) {
    var vm = this;
    vm.close = close;
    vm.company = company;
    vm.companies = companies;
    vm.deleteCompany = deleteCompany;

    activate();

    function activate() {

    }

    function close() {
      $uibModalInstance.dismiss('cancel');
    }

    function deleteCompany() {
      CompanyService.deleteCompany(vm.company)
        .then(function(data) {
          vm.companies.splice(vm.companies.indexOf(vm.company), 1);
          ngNotify.set('Company has been deleted successfully', 'success');
        })
        .catch(function(error) {
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      close();
    }

  }

})();
