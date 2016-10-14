(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('NavController', NavController);

  /* @ngInject */
  function NavController($state, UserService) {
    var vm = this;
    vm.user = {};
    vm.getUser = getUser;
    vm.isActive = isActive;
    vm.logout = logout;
    activate();
    getUser();

    function activate() {

    }

    function isActive(viewLocation) {
      return viewLocation === $state.current.name;
    }

    function getUser() {
      vm.user = UserService.getCurrentUser();
    }

    function logout(){
      UserService.clearCurrentUser();
      $state.go('login');
    }

  }
})();
