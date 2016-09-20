(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('NavController', NavController);

  /* @ngInject */
  function NavController($state) {
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
