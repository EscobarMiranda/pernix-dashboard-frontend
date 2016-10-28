(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('CreateCompanyController', CreateCompanyController);

  /* @ngInject */
  function CreateCompanyController(CompanyService, $uibModalInstance, ngNotify, companies) {
    var vm = this;
    vm.company = {};
    vm.companies = companies;
    vm.createCompany = createCompany;
    vm.close = close;

    function close() {
      $uibModalInstance.dismiss('cancel');
    }

    function createCompany() {
      vm.company.active = true;
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
