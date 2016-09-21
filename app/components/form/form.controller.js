(function() {
  'use strict';

  angular
    .module('app.login')
    .controller('FormController', FormController);

  /* @ngInject */
  function FormController() {
    var vm = this;

    activate();

    function activate() {
      vm.user = {};
    }

  }

})();
