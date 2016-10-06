(function() {
  'use strict';

  angular
    .module('app.service')
    .service('MetricService', MetricService);

  MetricService.$inject = ['$http', 'RESOURCE'];

  /* @ngInject */
  function MetricService($http, RESOURCE) {

    this.getMetrics = getMetrics;
    this.getMetric = getMetric;
    this.createMetric = createMetric;
    this.updateMetric = updateMetric;
    this.deleteMetric = deleteMetric;

    function getMetrics() {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'metric',
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

    function deleteMetric(metric) {
      var postRequest = {
        method: 'DELETE',
        url:  RESOURCE.API_URL + 'metric/' + metric.id,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return $http(postRequest);
    }

  }

})();
