(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('UpdateSurveyController', UpdateSurveyController);

  /* @ngInject */
  function UpdateSurveyController(
      SurveyService,
      survey,
      $uibModalInstance,
      ngNotify) {
    var vm = this;
    vm.survey = survey
    vm.close = close;
    vm.updateSurvey = updateSurvey;

    function close() {
      $uibModalInstance.dismiss('cancel');
    }

    function updateSurvey() {
      SurveyService.updateSurvey(vm.survey)
        .then(function(data) {
          ngNotify.set('Survey has been updated successfully', 'success');
        })
        .catch(function(error) {
          vm.survey = {};
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      close();
    }

  }

})();
