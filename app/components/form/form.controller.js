(function() {
  'use strict';

  angular
    .module('app.login')
    .controller('FormController', FormController);

  FormController.$inject = [
    'UserService',
    'CustomerSatisfactionService',
    'MetricService',
    'ngNotify',
    'RESOURCE',
    '$stateParams',
    '$state'
    ];

  /* @ngInject */
  function FormController(
      UserService,
      CustomerSatisfactionService,
      MetricService,
      ngNotify,
      RESOURCE,
      $stateParams,
      $state) {
    var vm = this;
    vm.metrics = [];
    vm.answers = {};
    vm.user = {};
    vm.user.id = $stateParams.idUser;
    vm.sendAnswers = sendAnswers;
    vm.scale = RESOURCE.SCALE;

    activate();
    getUser();
    getMetrics();

    function activate() {

    }

    function getUser() {
      UserService.getUser(vm.user)
        .then(function(userData) {
          vm.user = userData.data;
        })
        .catch(function(error) {
          ngNotify.set('Error loading user', 'error');
        });
    }

    function getMetrics() {
      MetricService.getMetrics()
        .then(function(metricsData) {
          vm.metrics = metricsData.data;
        })
        .catch(function(error) {
          ngNotify.set('Error loading metrics', 'error');
        });
    }

    function sendAnswers() {
      CustomerSatisfactionService.createCustomerSatisfactionList(
        CustomerSatisfactionService.buildAnswers(vm.user.id, vm.answers));
      $state.go('thanks');
    }

  }

})();
