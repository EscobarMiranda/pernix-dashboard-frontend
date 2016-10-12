(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('CreateSurveyController', CreateSurveyController);

  CreateSurveyController.$inject = [
    'SurveyService',
    'surveys',
    '$uibModalInstance',
    'ngNotify'
  ];

  /* @ngInject */
  function CreateSurveyController(
      SurveyService,
      surveys,
      $uibModalInstance,
      ngNotify) {
    var vm = this;
    vm.survey = {};
    vm.surveys = surveys;
    vm.createSurvey = createSurvey;
    vm.close = close;

    activate();

    function activate() {

    }

    function close() {
      $uibModalInstance.dismiss('cancel');
    }

    function createSurvey() {
      vm.survey.active = true;
      SurveyService.createSurvey(vm.survey)
        .then(function(data) {
          vm.surveys.push(vm.survey);
          ngNotify.set('Survey has been created successfully', 'success');
        })
        .catch(function(error) {
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      close();
    }

  }

})();
