(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('AdminSurveyController', AdminSurveyController);

  /* @ngInject */
  function AdminSurveyController($state, UserService, SurveyService, $uibModal, ngNotify) {
    var vm = this;
    vm.surveys = [];
    vm.createSurvey = createSurvey;
    vm.updateSurvey = updateSurvey;
    vm.deleteSurvey = deleteSurvey;
    vm.goToQuestions = goToQuestions;

    activate();
    getSurveys();

    function activate() {
      UserService.islogged();
      if (!UserService.getPermissions()) {
        $state.go('home.dashboard');
        ngNotify.set('Insufficient permissions', 'error');
      }
    }

    function getSurveys() {
      SurveyService.getSurveys()
        .then(function(surveysData) {
          vm.surveys = surveysData.data;
        })
        .catch(function(error) {
          ngNotify.set('Error loading surveys', 'error');
        });
    }

    function createSurvey() {
      $uibModal.open({
        templateUrl: 'app/components/admin/survey/create/create.html',
        controller: 'CreateSurveyController as vm',
        resolve: {
          surveys: function() {
            return vm.surveys;
          }
        }
      });
    }

    function updateSurvey(survey) {
      $uibModal.open({
        templateUrl: 'app/components/admin/survey/update/update.html',
        controller: 'UpdateSurveyController as vm',
        resolve: {
          survey: function() {
            return survey;
          }
        }
      });
    }

    function deleteSurvey(survey) {
      $uibModal.open({
        templateUrl: 'app/components/admin/survey/delete/delete.html',
        controller: 'DeleteSurveyController as vm',
        resolve: {
          survey: function() {
            return survey;
          }
        }
      });
    }

    function goToQuestions(survey) {
      $state.go('home.metric', {surveyId: survey.id});
    }

  }

})();
