(function() {
  'use strict';

  angular
    .module('app.service')
    .service('CustomerSatisfationService', CustomerSatisfationService);

  CustomerSatisfationService.$inject = ['$http', 'RESOURCE'];

  /* @ngInject */
  function CustomerSatisfationService($http, RESOURCE) {
    this.createCustomerSatisfactionList = createCustomerSatisfactionList;
    this.buildAnswers = buildAnswers;

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
