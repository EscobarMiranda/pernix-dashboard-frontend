(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('UpdateMetricController', UpdateMetricController);

  /* @ngInject */
  function UpdateMetricController(
      MetricService,
      metric,
      survey,
      $uibModalInstance,
      ngNotify) {
    var vm = this;
    vm.metric = metric
    vm.survey = survey;
    vm.close = close;
    vm.updateMetric = updateMetric;

    activate();

    function activate() {

    }

    function close() {
      $uibModalInstance.dismiss('cancel');
    }

    function updateMetric() {
      vm.metric.survey = vm.survey;
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
