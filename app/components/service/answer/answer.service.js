(function() {
  'use strict';

  angular
    .module('app.service')
    .service('AnswerService', AnswerService);

  AnswerService.$inject = ['$http', 'RESOURCE'];

  /* @ngInject */
  function AnswerService($http, RESOURCE) {
    this.getMetric = getMetric;
    this.createAnswerList = createAnswerList;
    this.buildAnswers = buildAnswers;

    function getMetric(path) {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'answer/' + path,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return $http(request);
    }

    function createAnswer(answer) {
      var postRequest = {
        method: 'POST',
        url:  RESOURCE.API_URL + 'answer',
        headers: {
          'Content-Type': 'application/json'
        },
        data: answer
      };

      return $http(postRequest);
    }

    function createAnswerList(answerList) {
      _.forEach(answerList, function(value, key) {
        createAnswer(value);
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
