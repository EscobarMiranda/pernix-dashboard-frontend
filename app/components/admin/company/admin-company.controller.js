(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('AdminCompanyController', AdminCompanyController);

  AdminCompanyController.$inject = ['CompanyService', '$uibModal', 'ngNotify'];

  /* @ngInject */
  function AdminCompanyController(CompanyService, $uibModal, ngNotify) {
    var vm = this;
    vm.companies = [];
    vm.createCompany = createCompany;
    vm.updateCompany = updateCompany;
    vm.deleteCompany = deleteCompany;

    activate();
    getCompanies();

    function activate() {

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

    function createCompany() {
      $uibModal.open({
        templateUrl: 'app/components/admin/company/create/create.html',
        controller: 'CreateCompanyController as vm',
        resolve: {
          companies: function() {
            return vm.companies;
          }
        }
      });
    }

    function updateCompany(company) {
      $uibModal.open({
        templateUrl: 'app/components/admin/company/update/update.html',
        controller: 'UpdateCompanyController as vm',
        resolve: {
          company: function() {
            return company;
          }
        }
      });
    }

    function deleteCompany(company) {
      $uibModal.open({
        templateUrl: 'app/components/admin/company/delete/delete.html',
        controller: 'DeleteCompanyController as vm',
        resolve: {
          company: function() {
            return company;
          }
        }
      });
    }

  }

})();
