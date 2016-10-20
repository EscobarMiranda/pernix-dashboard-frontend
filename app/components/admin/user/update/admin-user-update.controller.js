(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('UpdateUserController', UpdateUserController);

  /* @ngInject */
  function UpdateUserController(
      ManagerService,
      UserService,
      user,
      $uibModalInstance,
      ngNotify) {
    var vm = this;
    vm.managers = [];
    vm.manager = {};
    vm.userTypes = [];
    vm.userType = {};
    vm.user = user;
    vm.updateUser = updateUser;
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

    function updateUser() {
      vm.user.manager = JSON.parse(vm.manager);
      vm.user.userType = JSON.parse(vm.userType);
      UserService.updateUser(vm.user)
        .then(function(data) {
          vm.user = {};
          ngNotify.set('User has been updated successfully', 'success');
        })
        .catch(function(error) {
          vm.user = {};
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      close();
    }

  }

})();
