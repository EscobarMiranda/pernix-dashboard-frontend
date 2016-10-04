(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('UpdateMetricController', UpdateMetricController);

  UpdateMetricController.$inject = [
    'MetricService',
    'metric',
    '$uibModalInstance',
    'ngNotify'
    ];
  /* @ngInject */
  function UpdateMetricController(
    MetricService,
    metric,
    $uibModalInstance,
    ngNotify) {
    var vm = this;
    vm.metric = metric
    vm.close = close;
    vm.updateMetric = updateMetric;

    activate();

    function activate() {

    }

    function close() {
      $uibModalInstance.dismiss('cancel');
    }

    function updateMetric() {
      MetricService.updateMetric(vm.metric)
        .then(function(data) {
          ngNotify.set('Metric has been updated successfully', 'success');
        })
        .catch(function(error) {
          vm.metric = {};
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      close();
    }

  }

})();
