(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('DeleteUserController', DeleteUserController);

  /* @ngInject */
  function DeleteUserController(
      UserService,
      user,
      $uibModalInstance,
      ngNotify) {
    var vm = this;
    vm.close = close;
    vm.user = user;
    vm.deleteUser = deleteUser;

    activate();

    function activate() {

    }

    function close() {
      $uibModalInstance.dismiss('cancel');
    }

    function deleteUser() {
      UserService.changeStateUser(vm.user)
        .then(function(data) {
          vm.user.active = !vm.user.active;
          ngNotify.set('User has been updated successfully', 'success');
        })
        .catch(function(error) {
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      close();
    }

  }

})();
