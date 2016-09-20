(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('DeleteMetricController', DeleteMetricController);

  /* @ngInject */
  function DeleteMetricController($uibModalInstance) {
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
