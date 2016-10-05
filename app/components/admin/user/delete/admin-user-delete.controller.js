(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('DeleteUserController', DeleteUserController);

  DeleteUserController.$inject = [
    'UserService',
    'user',
    'users',
    '$uibModalInstance',
    'ngNotify'
    ];

  /* @ngInject */
  function DeleteUserController(
    UserService,
    user,
    users,
    $uibModalInstance,
    ngNotify) {
    var vm = this;
    vm.close = close;
    vm.user = user;
    vm.users = users;
    vm.deleteUser = deleteUser;

    activate();

    function activate() {

    }

    function close() {
      $uibModalInstance.dismiss('cancel');
    }

    function deleteUser() {
      UserService.deleteUser(vm.user)
        .then(function(data) {
          vm.users.splice(vm.users.indexOf(vm.user), 1);
          ngNotify.set('User has been deleted successfully', 'success');
        })
        .catch(function(error) {
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      close();
    }

  }

})();
