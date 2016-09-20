(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('UpdateUserController', UpdateUserController);

  /* @ngInject */
  function UpdateUserController($uibModalInstance) {
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
