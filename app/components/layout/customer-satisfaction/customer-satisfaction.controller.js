(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller(
      'CustomerSatisfactionController',
      CustomerSatisfactionController
      );

  CustomerSatisfactionController.$inject = [
    'CustomerSatisfactionService',
    'ngNotify',
    'RESOURCE',
    '$scope'
    ];

  /* @ngInject */
  function CustomerSatisfactionController(
      CustomerSatisfactionService,
      ngNotify,
      RESOURCE,
      $scope) {
    var vm = this;
    vm.csatMetrics = [];
    vm.getMetric = getMetric;

    activate();
    getMetric('general');
    $scope.$on('getMetric', function(event, path) { getMetric(path); });

    function activate() {

    }

    function getColor(value) {
      return RESOURCE.PALETTE[Math.round(value / 10)];
    }

    function getMetric(path) {
      vm.csatMetrics = [];
      CustomerSatisfactionService.getMetric(path)
        .then(function(csatData) {
          _.forEach(csatData.data, function(value, key) {
            var metric = {};
            metric.id = value.id;
            metric.name = value.name;
            metric.value = (value.value * 100) / 5;
            metric.color = getColor(metric.value);
            vm.csatMetrics.push(metric);
          });
        })
        .catch(function(error) {
          ngNotify.set('Error loading indicators', 'error');
        });
    }

  }
})();
