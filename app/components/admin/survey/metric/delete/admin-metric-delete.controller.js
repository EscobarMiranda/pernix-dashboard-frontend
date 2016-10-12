(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('DeleteMetricController', DeleteMetricController);

  DeleteMetricController.$inject = [
    'MetricService',
    'metric',
    'survey',
    '$uibModalInstance',
    'ngNotify'
  ];

  /* @ngInject */
  function DeleteMetricController(
      MetricService,
      metric,
      survey,
      $uibModalInstance,
      ngNotify) {
    var vm = this;
    vm.metric = metric;
    vm.survey = survey;
    vm.close = close;
    vm.deleteMetric = deleteMetric;

    activate();

    function activate() {

    }

    function close() {
      $uibModalInstance.dismiss('cancel');
    }

    function deleteMetric() {
      vm.metric.survey = vm.survey;
      MetricService.changeStateMetric(vm.metric)
        .then(function(data) {
          vm.metric.active = !vm.metric.active;
          ngNotify.set('Metric has been updated successfully', 'success');
        })
        .catch(function(error) {
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      close();
    }

  }

})();
