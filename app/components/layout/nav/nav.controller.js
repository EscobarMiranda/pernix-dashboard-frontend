(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('NavController', NavController);

  /* @ngInject */
  function NavController($state, UserService, ngNotify) {
    var vm = this;
    vm.user = {};
    vm.userType = {};
    vm.getUser = getUser;
    vm.isActive = isActive;
    vm.logout = logout;
    vm.setAdminId = setAdminId;
    activate();
    getUser();
    setAdminId();

    function activate() {
      UserService.islogged();
    }

    function isActive(viewLocation) {
      return viewLocation === $state.current.name;
    }

    function getUser() {
      vm.user = UserService.getCurrentUser();
    }

    function logout() {
      UserService.clearCurrentUser();
      $state.go('login');
    }

    function setAdminId() {
      UserService.getUserTypeByName('Administrator')
        .then(function(UserData) {
          vm.userType = UserData.data;
          UserService.setCurrentAdminId(vm.userType);
        })
        .catch(function(error) {
          ngNotify.set('Error loading permissions', 'error');
        });
    }

  }
})();
