(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('AdminMetricController', AdminMetricController);

  AdminMetricController.$inject = ['MetricService', '$uibModal', 'ngNotify'];

  /* @ngInject */
  function AdminMetricController(MetricService, $uibModal, ngNotify) {
    var vm = this;
    vm.metrics = [];
    vm.createMetric = createMetric;
    vm.updateMetric = updateMetric;
    vm.deleteMetric = deleteMetric;

    activate();
    getMetrics();

    function activate() {

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

    function createMetric() {
      $uibModal.open({
        templateUrl: 'app/components/admin/metric/create/create.html',
        controller: 'CreateMetricController as vm',
        resolve: {
          metrics: function() {
            return vm.metrics;
          }
        }
      });
    }

    function updateMetric(metric) {
      $uibModal.open({
        templateUrl: 'app/components/admin/metric/update/update.html',
        controller: 'UpdateMetricController as vm',
        resolve: {
          metric: function() {
            return metric;
          }
        }
      });
    }

    function deleteMetric(metric) {
      $uibModal.open({
        templateUrl: 'app/components/admin/metric/delete/delete.html',
        controller: 'DeleteMetricController as vm',
        resolve: {
          metric: function() {
            return metric;
          }
        }
      });
    }

  }

})();
