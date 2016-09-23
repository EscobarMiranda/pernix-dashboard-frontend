(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('DeleteCompanyController', DeleteCompanyController);

  /* @ngInject */
  function DeleteCompanyController($uibModalInstance) {
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
