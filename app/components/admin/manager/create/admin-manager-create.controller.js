(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('CreateManagerController', CreateManagerController);

  /* @ngInject */
  function CreateManagerController($uibModalInstance) {
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
