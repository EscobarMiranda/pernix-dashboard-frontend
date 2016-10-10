(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('DeleteMetricController', DeleteMetricController);

  DeleteMetricController.$inject = [
    'MetricService',
    'metric',
    '$uibModalInstance',
    'ngNotify'
    ];

  /* @ngInject */
  function DeleteMetricController(
      MetricService,
      metric,
      $uibModalInstance,
      ngNotify) {
    var vm = this;
    vm.metric = metric;
    vm.close = close;
    vm.deleteMetric = deleteMetric;

    activate();

    function activate() {

    }

    function close() {
      $uibModalInstance.dismiss('cancel');
    }

    function deleteMetric() {
      MetricService.deleteMetric(vm.metric)
        .then(function(data) {
          vm.metric.active = !vm.metric.active;
          ngNotify.set('Metric has been deleted successfully', 'success');
        })
        .catch(function(error) {
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      close();
    }

  }

})();
