(function() {
  'use strict';

  angular
    .module('app.service')
    .service('CustomerSatisfactionService', CustomerSatisfactionService);

  CustomerSatisfactionService.$inject = ['$http', 'RESOURCE'];

  /* @ngInject */
  function CustomerSatisfactionService($http, RESOURCE) {
    this.getMetric = getMetric;
    this.createCustomerSatisfactionList = createCustomerSatisfactionList;
    this.buildAnswers = buildAnswers;

    function getMetric(path) {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'customerSatisfaction/' + path,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return $http(request);
    }

    function createCustomerSatisfaction(customerSatisfaction) {
      var postRequest = {
        method: 'POST',
        url:  RESOURCE.API_URL + 'customerSatisfaction',
        headers: {
          'Content-Type': 'application/json'
        },
        data: customerSatisfaction
      };

      return $http(postRequest);
    }

    function createCustomerSatisfactionList(customerSatisfactionList) {
      _.forEach(customerSatisfactionList, function(value, key) {
        createCustomerSatisfaction(value);
      });
    }

    function buildAnswers(idUser, answers) {
      var simpleAnswers = [];
      _.forEach(answers, function(value, key) {
        var answer = {};
        answer.user = {id: idUser};
        answer.metric = {id: key};
        answer.value = value;
        simpleAnswers.push(answer);
      });
      return simpleAnswers;
    }

  }

})();
