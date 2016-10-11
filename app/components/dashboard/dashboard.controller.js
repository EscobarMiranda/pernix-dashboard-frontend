(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = [
    'CompanyService',
    'UserService',
    '$scope'
    ];

  /* @ngInject */
  function DashboardController(
      CompanyService,
      UserService,
      $scope) {
    var vm = this;
    vm.object = {};
    vm.object.name = 'General';
    vm.companies = [];
    vm.users = [];
    vm.getMetric = getMetric;

    activate();
    getCompanies();
    getUsers();

    function activate() {

    }

    function getMetric(path, object) {
      vm.object = object;
      $scope.$broadcast('getMetric', path + object.id);
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

    function getUsers() {
      UserService.getUsers()
        .then(function(usersData) {
          vm.users = usersData.data;
        })
        .catch(function(error) {
          ngNotify.set('Error loading users', 'error');
        });
    }

  }

})();
