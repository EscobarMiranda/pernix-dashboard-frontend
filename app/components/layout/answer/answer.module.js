(function() {
  'use strict';

  angular
  .module('app.layout')
  .component('answer', {
    templateUrl:
    'app/components/layout/answer/answer-tpl.html',
    controller: 'AnswerController as vm'
  });
})();
