(function() {
  'use strict';

  angular
    .module('app.login')
    .controller('FormController', FormController);

  /* @ngInject */
  function FormController(SurveyService,
                          UserService,
                          AnswerService,
                          MetricService,
                          ngNotify,
                          RESOURCE,
                          $stateParams,
                          $state) {
    var vm = this;
    vm.metrics = [];
    vm.answers = {};
    vm.user = {};
    vm.survey = {};
    vm.iconset = [];
    vm.reaction = {};
    vm.survey.id = $stateParams.surveyId;
    vm.user.id = $stateParams.userId;
    vm.sendAnswers = sendAnswers;
    vm.ratingsCallback = ratingsCallback;
    vm.scale = RESOURCE.SCALE;

    getUser();
    getMetricsBySurvey();
    getSurvey();
    prepareReactions();

    function prepareReactions() {
      vm.iconset = RESOURCE.ICONSET;
      vm.reaction = {
        minRating: 1,
        readOnly: false
      };
    }

    function getSurvey() {
      SurveyService.getSurvey(vm.survey)
        .then(function(surveyData) {
          vm.survey = surveyData.data;
        })
        .catch(function(error) {
          ngNotify.set('Error loading survey', 'error');
        });
    }

    function getUser() {
      UserService.getUser(vm.user)
        .then(function(userData) {
          vm.user = userData.data;
        })
        .catch(function(error) {
          ngNotify.set('Error loading user', 'error');
        });
    }

    function getMetricsBySurvey() {
      MetricService.getMetricsBySurvey(vm.survey)
        .then(function(metricsData) {
          vm.metrics = metricsData.data;
        })
        .catch(function(error) {
          ngNotify.set('Error loading metrics', 'error');
        });
    }

    function sendAnswers() {
      if (vm.metrics.length === Object.keys(vm.answers).length) {
        AnswerService.createAnswerList(
          AnswerService.buildAnswers(vm.user.id, vm.answers));
        $state.go('thanks');
      } else {
        ngNotify.set('Error, please answer all the questions', 'error');
      }
    }

    function ratingsCallback(metricId,selected) {
      vm.answers[metricId] = selected;
    }

  }

})();
