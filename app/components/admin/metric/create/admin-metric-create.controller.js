(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('CreateMetricController', CreateMetricController);

  /* @ngInject */
  function CreateMetricController($uibModalInstance) {
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
