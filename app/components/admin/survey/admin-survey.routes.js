(function() {
  'use strict';

  angular
    .module('app.admin')
    .config(routesConfiguration);

  /* @ngInject */
  function routesConfiguration($stateProvider) {
    $stateProvider
      .state('home.survey', {
        url: '/admin/survey',
        templateUrl: 'app/components/admin/survey/admin-survey.html',
        controller: 'AdminSurveyController as vm'
      })
      .state('home.metric', {
        url: '/admin/survey/metric/:surveyId',
        templateUrl: 'app/components/admin/survey/metric/admin-metric.html',
        controller: 'AdminMetricController as vm'
      });
  }
})();
