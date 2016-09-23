(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('DeleteManagerController', DeleteManagerController);

  /* @ngInject */
  function DeleteManagerController($uibModalInstance) {
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
