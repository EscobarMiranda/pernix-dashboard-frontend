(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('DeleteSurveyController', DeleteSurveyController);

  /* @ngInject */
  function DeleteSurveyController(
      SurveyService,
      survey,
      $uibModalInstance,
      ngNotify) {
    var vm = this;
    vm.survey = survey;
    vm.close = close;
    vm.changeStateSurvey = changeStateSurvey;

    activate();

    function activate() {

    }

    function close() {
      $uibModalInstance.dismiss('cancel');
    }

    function changeStateSurvey() {
      SurveyService.changeStateSurvey(vm.survey)
        .then(function(data) {
          vm.survey.active = !vm.survey.active;
          ngNotify.set('Survey has been updated successfully', 'success');
        })
        .catch(function(error) {
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      close();
    }

  }

})();
