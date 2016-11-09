(function() {
  'use strict';

  angular
    .module('app.service')
    .service('CompanyService', CompanyService);

  /* @ngInject */
  function CompanyService(UserService, $http, RESOURCE, $base64) {

    this.getCompanies = getCompanies;
    this.getCompany = getCompany;
    this.createCompany = createCompany;
    this.updateCompany = updateCompany;
    this.changeStateCompany = changeStateCompany;

    function getCompanies() {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'company',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': UserService.getAuthorization()
        }
      };

      return $http(request);
    }

    function getCompany(company) {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'company/' + company.id,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': UserService.getAuthorization()
        }
      };

      return $http(request);
    }

    function createCompany(company) {
      var postRequest = {
        method: 'POST',
        url:  RESOURCE.API_URL + 'company',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': UserService.getAuthorization()
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
          'Content-Type': 'application/json',
          'Authorization': UserService.getAuthorization()
        },
        data: company
      };

      return $http(postRequest);
    }

    function changeStateCompany(company) {
      var postRequest = {
        method: 'PUT',
        url:  RESOURCE.API_URL + 'company/changeState',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': UserService.getAuthorization()
        },
        data: company
      };

      return $http(postRequest);
    }

  }

})();
