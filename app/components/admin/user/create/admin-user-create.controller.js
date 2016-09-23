(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('CreateUserController', CreateUserController);

  /* @ngInject */
  function CreateUserController($uibModalInstance) {
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
