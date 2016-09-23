(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('CreateCompanyController', CreateCompanyController);

  /* @ngInject */
  function CreateCompanyController($uibModalInstance) {
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
