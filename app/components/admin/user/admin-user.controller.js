(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('AdminUserController', AdminUserController);

  /* @ngInject */
  function AdminUserController($uibModal) {
    var vm = this;
    vm.createUser = createUser;
    vm.updateUser = updateUser;
    vm.deleteUser = deleteUser;

    activate();

    function activate() {

    }

    function createUser() {
      $uibModal.open({
        templateUrl: 'app/components/admin/user/create/create.html',
        controller: 'CreateUserController as vm'
      });
    }

    function updateUser() {
      $uibModal.open({
        templateUrl: 'app/components/admin/user/update/update.html',
        controller: 'UpdateUserController as vm'
      });
    }

    function deleteUser() {
      $uibModal.open({
        templateUrl: 'app/components/admin/user/delete/delete.html',
        controller: 'DeleteUserController as vm'
      });
    }

  }

})();
