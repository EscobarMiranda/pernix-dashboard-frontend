(function() {
  'use strict';

  angular
    .module('app.layout')
    .component('navBar', {
      templateUrl: 'app/components/layout/nav/nav-tpl.html',
      controller: 'NavController as vm'
    });
})();
