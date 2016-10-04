(function() {
  'use strict';

  angular
    .module('app.service')
    .service('CompanyService', CompanyService);

  CompanyService.$inject = ['$http', 'RESOURCE'];

  /* @ngInject */
  function CompanyService($http, RESOURCE) {

    this.getCompanies = getCompanies;
    this.getCompany = getCompany;
    this.createCompany = createCompany;
    this.updateCompany = updateCompany;
    this.deleteCompany = deleteCompany;

    function getCompanies() {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'company',
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return $http(request);
    }

    function getCompany(company) {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'company/' + company.id,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return $http(request);
    }

    function createCompany(company) {
      var postRequest = {
        method: 'POST',
        url:  RESOURCE.API_URL + 'company',
        headers: {
          'Content-Type': 'application/json'
        },
        data: company
      };

      return $http(postRequest);
    }

    function updateCompany(company) {
      var postRequest = {
        method: 'PUT',
        url:  RESOURCE.API_URL + 'company',
        headers: {
          'Content-Type': 'application/json'
        },
        data: company
      };

      return $http(postRequest);
    }

    function deleteCompany(company) {
      var postRequest = {
        method: 'DELETE',
        url:  RESOURCE.API_URL + 'company/' + company.id,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return $http(postRequest);
    }

  }

})();
