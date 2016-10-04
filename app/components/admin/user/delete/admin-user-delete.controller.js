(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('DeleteUserController', DeleteUserController);

  /* @ngInject */
  function DeleteUserController($uibModalInstance) {
    var vm = this;
    vm.cancel = cancel;

    activate();

    function activate() {

    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

  }

})();
