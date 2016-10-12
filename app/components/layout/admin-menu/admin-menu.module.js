(function() {
  'use strict';

  angular
    .module('app.layout')
    .component('adminMenu', {
      templateUrl: 'app/components/layout/admin-menu/admin-menu-tpl.html',
      controller: 'AdminMenuController as vm'
    });
})();
