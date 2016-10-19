(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('CreateUserController', CreateUserController);

  CreateUserController.$inject = [
    'ManagerService',
    'UserService',
    'users',
    '$uibModalInstance',
    'ngNotify'
  ];

  /* @ngInject */
  function CreateUserController(
      ManagerService,
      UserService,
      users,
      $uibModalInstance,
      ngNotify) {
    var vm = this;
    vm.managers = [];
    vm.manager = {};
    vm.userTypes = [];
    vm.userType = {};
    vm.user = {};
    vm.users = users;
    vm.createUser = createUser;
    vm.close = close;

    activate();
    getManagers();
    getUserTypes();

    function activate() {

    }

    function close() {
      $uibModalInstance.dismiss('cancel');
    }

    function getManagers() {
      ManagerService.getManagers()
        .then(function(managersData) {
          vm.managers = managersData.data;
        })
        .catch(function(error) {
          ngNotify.set('Error loading user types', 'error');
        });
    }

    function getUserTypes() {
      UserService.getUserTypes()
        .then(function(userTypesData) {
          vm.userTypes = userTypesData.data;
        })
        .catch(function(error) {
          ngNotify.set('Error loading user types', 'error');
        });
    }

    function createUser() {
      vm.user.active = true;
      vm.user.manager = JSON.parse(vm.manager);
      vm.user.userType = JSON.parse(vm.userType);
      UserService.createUser(vm.user)
        .then(function(data) {
          vm.users.push(vm.user);
          vm.user = {};
          ngNotify.set('User has been created successfully', 'success');
        })
        .catch(function(error) {
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      close();
    }

  }

})();
