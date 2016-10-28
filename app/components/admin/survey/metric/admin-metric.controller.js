(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('AdminMetricController', AdminMetricController);

  /* @ngInject */
  function AdminMetricController(
      SurveyService,
      MetricService,
      $uibModal,
      ngNotify,
      $stateParams) {
    var vm = this;
    vm.metrics = [];
    vm.createMetric = createMetric;
    vm.updateMetric = updateMetric;
    vm.deleteMetric = deleteMetric;
    vm.survey = {};
    vm.survey.id = $stateParams.surveyId;

    getSurvey();
    getMetrics();

    function getSurvey() {
      SurveyService.getSurvey(vm.survey)
        .then(function(surveyData) {
          vm.survey = surveyData.data;
        })
        .catch(function(error) {
          ngNotify.set('Error loading survey information', 'error');
        });
    }

    function getMetrics() {
      MetricService.getMetricsBySurvey(vm.survey)
        .then(function(metricsData) {
          vm.metrics = metricsData.data;
        })
        .catch(function(error) {
          ngNotify.set('Error loading metrics', 'error');
        });
    }

    function createMetric() {
      $uibModal.open({
        templateUrl: 'app/components/admin/survey/metric/create/create.html',
        controller: 'CreateMetricController as vm',
        resolve: {
          metrics: function() {
            return vm.metrics;
          },
          survey: function() {
            return vm.survey;
          }
        }
      });
    }

    function updateMetric(metric) {
      $uibModal.open({
        templateUrl: 'app/components/admin/survey/metric/update/update.html',
        controller: 'UpdateMetricController as vm',
        resolve: {
          metric: function() {
            return metric;
          },
          survey: function() {
            return vm.survey;
          }
        }
      });
    }

    function deleteMetric(metric) {
      $uibModal.open({
        templateUrl: 'app/components/admin/survey/metric/delete/delete.html',
        controller: 'DeleteMetricController as vm',
        resolve: {
          metric: function() {
            return metric;
          },
          survey: function() {
            return vm.survey;
          }
        }
      });
    }

  }

})();
