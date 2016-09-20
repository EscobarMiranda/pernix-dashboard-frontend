(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('UpdateManagerController', UpdateManagerController);

  /* @ngInject */
  function UpdateManagerController($uibModalInstance) {
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
