(function() {
  'use strict';

  angular
    .module('app.login')
    .controller('LoginController', LoginController);

  /* @ngInject */
  function LoginController($state, GoogleSignin, LoginService, ngNotify, UserService) {
    var vm = this;
    vm.user = {};
    vm.loginObject = {};
    vm.authenticateUser = authenticateUser;
    activate();

    function activate() {
    }

    function authenticateUser() {
      GoogleSignin.signIn().then(function(user) {
        vm.user = user.w3;
        if (vm.user.U3.includes('@pernix-solutions')) {
          vm.loginObject.name = vm.user.ofa;
          vm.loginObject.lastname = vm.user.wea;
          vm.loginObject.email = vm.user.U3;
          LoginService.getUser(vm.loginObject).then(function(userData) {
            vm.user = userData.data;
            UserService.setCurrentUser(vm.user);
            $state.go('home.dashboard');
          })
          .catch(function(error) {
            ngNotify.set('Error loading users', 'error');
          });
        } else {
          ngNotify.set('Your profile does not belong to any domain of Pernix', 'error');
        }
      }), function(err) {
        ngNotify.set('Error loading users', 'error');
      };
    }
  }

})();
