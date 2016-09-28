(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('AdminMetricController', AdminMetricController);

  /* @ngInject */
  function AdminMetricController($uibModal) {
    var vm = this;
    vm.createMetric = createMetric;
    vm.updateMetric = updateMetric;
    vm.deleteMetric = deleteMetric;

    activate();

    function activate() {

    }

    function createMetric() {
      $uibModal.open({
        templateUrl: 'app/components/admin/metric/create/create.html',
        controller: 'CreateMetricController as vm'
      });
    }

    function updateMetric() {
      $uibModal.open({
        templateUrl: 'app/components/admin/metric/update/update.html',
        controller: 'UpdateMetricController as vm'
      });
    }

    function deleteMetric() {
      $uibModal.open({
        templateUrl: 'app/components/admin/metric/delete/delete.html',
        controller: 'DeleteMetricController as vm'
      });
    }

  }

})();
