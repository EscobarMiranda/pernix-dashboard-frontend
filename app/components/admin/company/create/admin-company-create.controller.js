(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('CreateCompanyController', CreateCompanyController);

  CreateCompanyController.$inject = [
    'CompanyService',
    '$uibModalInstance',
    'ngNotify',
    'companies'
    ];

  /* @ngInject */
  function CreateCompanyController(
      CompanyService,
      $uibModalInstance,
      ngNotify,
      companies) {
    var vm = this;
    vm.company = {};
    vm.companies = companies;
    vm.createCompany = createCompany;
    vm.close = close;

    activate();

    function activate() {

    }

    function close() {
      $uibModalInstance.dismiss('cancel');
    }

    function createCompany() {
      CompanyService.createCompany(vm.company)
        .then(function(data) {
          vm.companies.push(vm.company);
          vm.company = {};
          ngNotify.set('Company has been created successfully', 'success');
        })
        .catch(function(error) {
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      close();
    }

  }

})();
