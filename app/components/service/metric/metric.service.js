(function() {
  'use strict';

  angular
    .module('app.service')
    .service('MetricService', MetricService);

  /* @ngInject */
  function MetricService($http, RESOURCE) {

    this.getMetricsBySurvey = getMetricsBySurvey;
    this.getMetric = getMetric;
    this.createMetric = createMetric;
    this.updateMetric = updateMetric;
    this.changeStateMetric = changeStateMetric;

    function getMetricsBySurvey(survey) {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'metric/bySurvey/' + survey.id,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return $http(request);
    }

    function getMetric(metric) {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'metric/' + metric.id,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return $http(request);
    }

    function createMetric(metric) {
      var postRequest = {
        method: 'POST',
        url:  RESOURCE.API_URL + 'metric',
        headers: {
          'Content-Type': 'application/json'
        },
        data: metric
      };

      return $http(postRequest);
    }

    function updateMetric(metric) {
      var postRequest = {
        method: 'PUT',
        url:  RESOURCE.API_URL + 'metric',
        headers: {
          'Content-Type': 'application/json'
        },
        data: metric
      };

      return $http(postRequest);
    }

    function changeStateMetric(metric) {
      var postRequest = {
        method: 'PUT',
        url:  RESOURCE.API_URL + 'metric/changeState',
        headers: {
          'Content-Type': 'application/json'
        },
        data: metric
      };

      return $http(postRequest);
    }

  }

})();
