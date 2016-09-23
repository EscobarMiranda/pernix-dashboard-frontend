(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('UpdateCompanyController', UpdateCompanyController);

  /* @ngInject */
  function UpdateCompanyController($uibModalInstance) {
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
