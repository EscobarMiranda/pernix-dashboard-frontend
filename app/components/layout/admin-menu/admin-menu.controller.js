(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('AdminMenuController', AdminMenuController);

  /* @ngInject */
  function AdminMenuController(UserService, $state, ngNotify) {
    var vm = this;
    vm.visible = UserService.getPermissions();
    vm.isActive = isActive;
    activate();

    function activate() {
      UserService.verifyCredentials();
    }

    function isActive(viewLocation) {
      return viewLocation === $state.current.name;
    }

  }
})();
