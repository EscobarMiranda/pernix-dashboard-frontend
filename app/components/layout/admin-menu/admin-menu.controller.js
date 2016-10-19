(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('AdminMenuController', AdminMenuController);

  /* @ngInject */
  function AdminMenuController($state) {
    var vm = this;
    vm.isActive = isActive;

    activate();

    function activate() {

    }

    function isActive(viewLocation) {
      return viewLocation === $state.current.name;
    }

  }
})();
