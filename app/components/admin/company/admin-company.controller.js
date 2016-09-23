(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('AdminCompanyController', AdminCompanyController);

  /* @ngInject */
  function AdminCompanyController($uibModal) {
    var vm = this;
    vm.createCompany = createCompany;
    vm.updateCompany = updateCompany;
    vm.deleteCompany = deleteCompany;

    activate();

    function activate() {

    }

    function createCompany() {
      $uibModal.open({
        templateUrl: 'app/components/admin/company/create/create.html',
        controller: 'CreateCompanyController as vm'
      });
    }

    function updateCompany() {
      $uibModal.open({
        templateUrl: 'app/components/admin/company/update/update.html',
        controller: 'UpdateCompanyController as vm'
      });
    }

    function deleteCompany() {
      $uibModal.open({
        templateUrl: 'app/components/admin/company/delete/delete.html',
        controller: 'DeleteCompanyController as vm'
      });
    }

  }

})();
