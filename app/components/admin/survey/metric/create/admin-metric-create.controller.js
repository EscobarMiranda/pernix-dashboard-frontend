(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('CreateMetricController', CreateMetricController);

  CreateMetricController.$inject = [
    'MetricService',
    'survey',
    'metrics',
    '$uibModalInstance',
    'ngNotify'
  ];

  /* @ngInject */
  function CreateMetricController(
      MetricService,
      survey,
      metrics,
      $uibModalInstance,
      ngNotify) {
    var vm = this;
    vm.metric = {};
    vm.survey = survey;
    vm.metrics = metrics;
    vm.createMetric = createMetric;
    vm.close = close;

    activate();

    function activate() {

    }

    function close() {
      $uibModalInstance.dismiss('cancel');
    }

    function createMetric() {
      vm.metric.active = true;
      vm.metric.survey = vm.survey;
      MetricService.createMetric(vm.metric)
        .then(function(data) {
          vm.metrics.push(vm.metric);
          ngNotify.set('Metric has been created successfully', 'success');
        })
        .catch(function(error) {
          vm.metric = {};
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      close();
    }

  }

})();
