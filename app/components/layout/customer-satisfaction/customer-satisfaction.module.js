(function() {
  'use strict';

  angular
  .module('app.layout')
  .component('customerSatisfaction', {
    templateUrl:
    'app/components/layout/customer-satisfaction/customer-satisfaction-tpl.html',
    controller: 'CustomerSatisfactionController as vm'
  });
})();
