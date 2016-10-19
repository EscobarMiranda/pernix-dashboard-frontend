(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('AdminMenuController', AdminMenuController);

  /* @ngInject */
  function AdminMenuController(UserService, $state) {
    var vm = this;
    vm.isActive = isActive;
    vm.visible = UserService.getPermissions();

    activate();

    function activate() {

    }

    function isActive(viewLocation) {
      return viewLocation === $state.current.name;
    }

  }
})();
