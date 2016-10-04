(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('AdminUserController', AdminUserController);

  AdminUserController.$inject = ['UserService', '$uibModal', 'ngNotify'];
  /* @ngInject */
  function AdminUserController(UserService, $uibModal, ngNotify) {
    var vm = this;
    vm.users = [];
    vm.createUser = createUser;
    vm.updateUser = updateUser;
    vm.deleteUser = deleteUser;

    activate();
    getUsers();

    function activate() {

    }

    function getUsers() {
      UserService.getUsers()
        .then(function(usersData) {
          vm.users = usersData.data;
        })
        .catch(function(error) {
          ngNotify.set('Error loading users', 'error');
        });
    }

    function createUser() {
      $uibModal.open({
        templateUrl: 'app/components/admin/user/create/create.html',
        controller: 'CreateUserController as vm',
        resolve: {
          users: function() {
            return vm.users;
          }
        }
      });
    }

    function updateUser(user) {
      $uibModal.open({
        templateUrl: 'app/components/admin/user/update/update.html',
        controller: 'UpdateUserController as vm',
        resolve: {
          user: function() {
            return user;
          }
        }
      });
    }

    function deleteUser(user) {
      $uibModal.open({
        templateUrl: 'app/components/admin/user/delete/delete.html',
        controller: 'DeleteUserController as vm',
        resolve: {
          user: function() {
            return user;
          },
          users: function() {
            return vm.users;
          }
        }
      });
    }

  }

})();
