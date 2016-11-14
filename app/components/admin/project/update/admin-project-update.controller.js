(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('UpdateProjectController', UpdateProjectController);

  /* @ngInject */
  function UpdateProjectController(UserService,
                                   OnTrackService,
                                   ProjectService,
                                   ObjectService,
                                   project,
                                   $uibModalInstance,
                                   $filter,
                                   RESOURCE,
                                   ngNotify) {
    var vm = this;
    vm.onTrackList = [];
    vm.project = project;
    vm.closeModal = closeModal;
    vm.onTrack = vm.project.onTrack;
    vm.users = [];
    vm.visible = UserService.getPermissions();
    vm.assignedUser = vm.project.user;
    vm.updateProject = updateProject;
    vm.toggleStartDatePopup = toggleStartDatePopup;
    vm.toggleEndDatePopup = toggleEndDatePopup;
    vm.toggleLastDemoPopup = toggleLastDemoPopup;
    vm.dateOptions = {
      showWeeks: false,
      datepickerMode: 'year'
    };
    vm.startDatePopup = {
      opened: false
    };
    vm.endDatePopup = {
      opened: false
    };
    vm.lastDemoPopup = {
      opened: false
    };

    getOnTrack();
    getUsers();

    function closeModal() {
      $uibModalInstance.dismiss('cancel');
    }

    function getOnTrack() {
      OnTrackService.getOnTrack()
        .then(function(onTrackData) {
          vm.onTrackList = onTrackData.data;
        })
        .catch(function(error) {
          ngNotify.set('Error loading data', 'error');
        });
    }

    function loadModels() {
      vm.project.startDate = new Date($filter(RESOURCE.filterName)(vm.project.startDate, RESOURCE.formatDate));
      vm.project.endDate = new Date($filter(RESOURCE.filterName)(vm.project.endDate, RESOURCE.formatDate));
      vm.project.lastDemo = new Date($filter(RESOURCE.filterName)(vm.project.lastDemo, RESOURCE.formatDate));
      vm.project.onTrack = ObjectService.parseObject(vm.project.onTrack);
      vm.onTrack = vm.project.onTrack;
      vm.project.user = ObjectService.parseObject(vm.project.user);
      vm.assignedUser = vm.project.user;
    }

    function updateProject() {
      loadModels();
      ProjectService.createProject(vm.project)
        .then(function(data) {
          vm.project = {};
          ngNotify.set('Project has been updated successfully', 'success');
        })
        .catch(function(error) {
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      closeModal();
    }

    function getUsers() {
      UserService.getUsers()
        .then(function(usersData) {
          vm.users = usersData.data;
        })
        .catch(function(error) {
          ngNotify.set('Error loading users', 'error');
        });
    }

    function toggleStartDatePopup() {
      vm.startDatePopup.opened = true;
      return vm.startDatePopup.opened;
    }

    function toggleEndDatePopup() {
      vm.endDatePopup.opened = true;
      return vm.endDatePopup.opened;
    }

    function toggleLastDemoPopup() {
      vm.lastDemoPopup.opened = true;
      return vm.lastDemoPopup.opened;
    }

  }

})();
