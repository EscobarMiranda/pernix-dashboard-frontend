(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller(
      'AnswerController',
      AnswerController
      );

  /* @ngInject */
  function AnswerController(AnswerService, ngNotify, RESOURCE, $scope) {
    var vm = this;
    vm.answers = [];
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
      vm.answers = [];
      AnswerService.getMetric(path)
        .then(function(data) {
          _.forEach(data.data, function(value, key) {
            var metric = {};
            metric.id = value.id;
            metric.name = value.name;
            metric.value = (value.value * 100) / 5;
            metric.color = getColor(metric.value);
            vm.answers.push(metric);
          });
        })
        .catch(function(error) {
          ngNotify.set('Error loading indicators', 'error');
        });
    }

  }
})();
