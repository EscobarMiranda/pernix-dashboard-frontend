(function() {
  'use strict';

  angular
    .module('app.login')
    .controller('LoginController', LoginController);

  /* @ngInject */
  function LoginController($state, toastr) {
    var vm = this;
    
    vm.authenticateUser = authenticateUser;
    activate();

    function activate() {
      vm.user = {};
    }

    function authenticateUser() {
      $state.go('home.dashboard');
    }

  }

})();
