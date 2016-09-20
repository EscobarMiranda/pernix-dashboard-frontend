(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('UpdateMetricController', UpdateMetricController);

  /* @ngInject */
  function UpdateMetricController($uibModalInstance) {
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
