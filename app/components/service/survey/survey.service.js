(function() {
  'use strict';

  angular
    .module('app.service')
    .service('SurveyService', SurveyService);

  /* @ngInject */
  function SurveyService(UserService, $http, RESOURCE, $base64) {

    this.getSurveys = getSurveys;
    this.getSurvey = getSurvey;
    this.createSurvey = createSurvey;
    this.updateSurvey = updateSurvey;
    this.changeStateSurvey = changeStateSurvey;

    function getSurveys() {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'survey',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': UserService.getAuthorization()
        }
      };

      return $http(request);
    }

    function getSurvey(survey) {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'survey/' + survey.id,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': UserService.getAuthorization()
        }
      };

      return $http(request);
    }

    function createSurvey(survey) {
      var postRequest = {
        method: 'POST',
        url:  RESOURCE.API_URL + 'survey',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': UserService.getAuthorization()
        },
        data: survey
      };

      return $http(postRequest);
    }

    function updateSurvey(survey) {
      var postRequest = {
        method: 'PUT',
        url:  RESOURCE.API_URL + 'survey',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': UserService.getAuthorization()
        },
        data: survey
      };

      return $http(postRequest);
    }

    function changeStateSurvey(survey) {
      var postRequest = {
        method: 'PUT',
        url:  RESOURCE.API_URL + 'survey/changeState',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': UserService.getAuthorization()
        },
        data: survey
      };

      return $http(postRequest);
    }

  }

})();
