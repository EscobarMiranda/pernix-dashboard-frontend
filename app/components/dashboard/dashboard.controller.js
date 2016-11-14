(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  /* @ngInject */
  function DashboardController(CompanyService, UserService, $scope, ngNotify, $state) {
    var vm = this;
    vm.visible = UserService.getPermissions();
    vm.user = UserService.getCurrentUser();
    vm.object = {};
    vm.object.name = 'General';
    vm.companies = [];
    vm.users = [];
    vm.getMetric = getMetric;
    vm.reload = reload;

    activate();
    getCompanies();
    getUsers();

    function activate() {
      UserService.verifyCredentials();
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

    function reload() {
      $state.reload();
    }

  }

})();
