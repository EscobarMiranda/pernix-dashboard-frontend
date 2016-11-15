(function() {
  'use strict';

  angular
    .module('app', [
      'app.admin',
      'app.core',
      'app.dashboard',
      'app.form',
      'app.home',
      'app.layout',
      'app.login',
      'app.resource',
      'app.service'
    ]);

})();

(function() {
  'use strict';

  angular
    .module('app.admin', [
      'app.core',
      'ui.bootstrap'
    ]);
})();

(function() {
  'use strict';

  angular
    .module('app.core', [
      'ui.router',
      'ngMessages',
      'base64',
      'gridshore.c3js.chart',
      'ngNotify',
      'ngLodash',
      'google-signin',
      'ui.mask'
    ]);

})();

(function() {
  'use strict';

  angular
    .module('app.dashboard', [
      'app.core',
      'ui.bootstrap'
    ]);
})();

(function() {
  'use strict';

  angular
    .module('app.form', [
      'app.core'
    ]);

})();

(function() {
  'use strict';

  angular
    .module('app.home', [
      'app.core',
      'app.layout'
    ]);

})();

(function() {
  'use strict';

  angular
    .module('app.layout', []);
})();

(function() {
  'use strict';

  angular
    .module('app.login', [
      'app.core'
    ]);

})();

(function() {
  'use strict';

  angular
    .module('app.resource', ['app.core']);
})();

(function() {
  'use strict';

  angular
    .module('app.service', ['app.core']);
})();

(function() {
  'use strict';

  angular
    .module('app.layout')
    .component('adminMenu', {
      templateUrl: 'app/components/layout/admin-menu/admin-menu-tpl.html',
      controller: 'AdminMenuController as vm'
    });
})();

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

(function() {
  'use strict';

  angular
    .module('app.layout')
    .component('navBar', {
      templateUrl: 'app/components/layout/nav/nav-tpl.html',
      controller: 'NavController as vm'
    });
})();

(function() {
  'use strict';

  angular
    .module('app.layout')
    .component('project', {
      templateUrl: 'app/components/layout/project/project-tpl.html',
      controller: 'ProjectController as vm'
    });
})();

(function() {
  'use strict';

  angular
    .module('app')
    .config(configuration);

  /* @ngInject */
  function configuration(RESOURCE, GoogleSigninProvider) {
    GoogleSigninProvider.init({
      client_id: RESOURCE.GOOGLE_CLIENT_ID
    });
  }

})();

(function() {
  'use strict';

  angular
    .module('app')
    .config(routesConfiguration);

  /* @ngInject */
  function routesConfiguration($urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
  }

})();

(function() {
  'use strict';

  angular
    .module('app')
    .run(run);

  function run() {

  }
})();

(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  /* @ngInject */
  function DashboardController(CompanyService, UserService, $scope, ngNotify, $state) {
    var vm = this;
    vm.visible = UserService.getPermissions();
    vm.user = UserService.getCurrentUser();
    vm.object = {};
    vm.object.name = 'General';
    vm.companies = [];
    vm.users = [];
    vm.getMetric = getMetric;
    vm.reload = reload;

    activate();
    getCompanies();
    getUsers();

    function activate() {
      UserService.verifyCredentials();
    }

    function getMetric(path, object) {
      vm.object = object;
      $scope.$broadcast('getMetric', path + object.id);
    }

    function getCompanies() {
      CompanyService.getCompanies()
        .then(function(companiesData) {
          vm.companies = companiesData.data;
        })
        .catch(function(error) {
          ngNotify.set('Error loading companies', 'error');
        });
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

    function reload() {
      $state.reload();
    }

  }

})();

(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .config(routesConfiguration);

  /* @ngInject */
  function routesConfiguration($stateProvider) {
    $stateProvider
      .state('home.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/components/dashboard/dashboard.html',
        controller: 'DashboardController as vm'
      });
  }
})();

(function() {
  'use strict';

  angular
    .module('app.login')
    .controller('FormController', FormController);

  /* @ngInject */
  function FormController(SurveyService,
                          UserService,
                          AnswerService,
                          MetricService,
                          ngNotify,
                          RESOURCE,
                          $stateParams,
                          $state) {
    var vm = this;
    vm.metrics = [];
    vm.answers = {};
    vm.user = {};
    vm.survey = {};
    vm.survey.id = $stateParams.surveyId;
    vm.user.id = $stateParams.userId;
    vm.sendAnswers = sendAnswers;
    vm.scale = RESOURCE.SCALE;

    getUser();
    getMetricsBySurvey();
    getSurvey();

    function getSurvey() {
      SurveyService.getSurvey(vm.survey)
        .then(function(surveyData) {
          vm.survey = surveyData.data;
        })
        .catch(function(error) {
          ngNotify.set('Error loading survey', 'error');
        });
    }

    function getUser() {
      UserService.getUser(vm.user)
        .then(function(userData) {
          vm.user = userData.data;
        })
        .catch(function(error) {
          ngNotify.set('Error loading user', 'error');
        });
    }

    function getMetricsBySurvey() {
      MetricService.getMetricsBySurvey(vm.survey)
        .then(function(metricsData) {
          vm.metrics = metricsData.data;
        })
        .catch(function(error) {
          ngNotify.set('Error loading metrics', 'error');
        });
    }

    function sendAnswers() {
      AnswerService.createAnswerList(
        AnswerService.buildAnswers(vm.user.id, vm.answers));
      $state.go('thanks');
    }

  }

})();

(function() {
  'use strict';

  angular
    .module('app.login')
    .config(routesConfiguration);

  /* @ngInject */
  function routesConfiguration($stateProvider) {

    $stateProvider
      .state('form', {
        url: '/form/:surveyId/:userId',
        templateUrl: 'app/components/form/form.html',
        controller: 'FormController as vm'
      })
      .state('thanks', {
        url: '/thanks',
        templateUrl: 'app/components/form/thanks.html'
      });

  }

})();

(function() {
  'use strict';

  angular
    .module('app.home')
    .config(routesConfiguration);

  /* @ngInject */
  function routesConfiguration($stateProvider) {

    $stateProvider
      .state('home', {
        templateUrl: 'app/components/home/home.html'
      });

  }

})();

(function() {
  'use strict';

  angular
    .module('app.login')
    .controller('LoginController', LoginController);

  /* @ngInject */
  function LoginController($state, GoogleSignin, LoginService, ngNotify, UserService) {
    var vm = this;
    vm.user = {};
    vm.loginObject = {};
    vm.authenticateUser = authenticateUser;

    function authenticateUser() {
      GoogleSignin.signIn().then(function(user) {
        vm.user = user.w3;
        if (vm.user.U3.includes('@pernix-solutions')) {
          vm.loginObject.name = vm.user.ofa;
          vm.loginObject.lastname = vm.user.wea;
          vm.loginObject.email = vm.user.U3;
          vm.loginObject.password = vm.user.Eea;
          LoginService.getUser(vm.loginObject).then(function(userData) {
            vm.user = userData.data;
            UserService.setCurrentUser(vm.user);
            $state.go('home.dashboard');
          })
          .catch(function(error) {
            ngNotify.set('Error loading users', 'error');
          });
        } else {
          ngNotify.set('Your profile does not belong to any domain of Pernix', 'error');
        }
      }), function(err) {
        ngNotify.set('Error loading users', 'error');
      };
    }
  }

})();

(function() {
  'use strict';

  angular
    .module('app.login')
    .config(routesConfiguration);

  /* @ngInject */
  function routesConfiguration($stateProvider) {

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/components/login/login.html',
        controller: 'LoginController as vm'
      });

  }

})();

(function() {
  'use strict';

  angular
    .module('app.resource')
    .constant('RESOURCE', {
      'API_URL': 'http://pernix-dashboard-backend.herokuapp.com/rest/',
      'SCALE' : [1,2,3,4,5],
      'PALETTE' : [
        'RED',
        'RED',
        'RED',
        'RED',
        'RED',
        'RED',
        'YELLOW',
        'YELLOW',
        'GREEN',
        'GREEN',
        'GREEN'
        ],
      'GOOGLE_CLIENT_ID':
        '677278398565-ldsfl0j55hl0aihs280hitt2qtrvd6an.apps.googleusercontent.com',
      'filterName': 'date',
      'formatDate': 'yyyy/MM/dd'

    });

})();

(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('AdminCompanyController', AdminCompanyController);

  /* @ngInject */
  function AdminCompanyController($state, UserService, CompanyService, $uibModal, ngNotify) {
    var vm = this;
    vm.companies = [];
    vm.createCompany = createCompany;
    vm.updateCompany = updateCompany;
    vm.deleteCompany = deleteCompany;

    activate();
    getCompanies();

    function activate() {
      UserService.verifyCredentials();
      if (!UserService.getPermissions()) {
        $state.go('home.dashboard');
        ngNotify.set('Insufficient permissions', 'error');
      }
    }

    function getCompanies() {
      CompanyService.getCompanies()
        .then(function(companiesData) {
          vm.companies = companiesData.data;
        })
        .catch(function(error) {
          ngNotify.set('Error loading companies', 'error');
        });
    }

    function createCompany() {
      $uibModal.open({
        templateUrl: 'app/components/admin/company/create/create.html',
        controller: 'CreateCompanyController as vm',
        resolve: {
          companies: function() {
            return vm.companies;
          }
        }
      });
    }

    function updateCompany(company) {
      $uibModal.open({
        templateUrl: 'app/components/admin/company/update/update.html',
        controller: 'UpdateCompanyController as vm',
        resolve: {
          company: function() {
            return company;
          }
        }
      });
    }

    function deleteCompany(company) {
      $uibModal.open({
        templateUrl: 'app/components/admin/company/delete/delete.html',
        controller: 'DeleteCompanyController as vm',
        resolve: {
          company: function() {
            return company;
          }
        }
      });
    }

  }

})();

(function() {
  'use strict';

  angular
    .module('app.admin')
    .config(routesConfiguration);

  /* @ngInject */
  function routesConfiguration($stateProvider) {
    $stateProvider
      .state('home.company', {
        url: '/admin/company',
        templateUrl: 'app/components/admin/company/admin-company.html',
        controller: 'AdminCompanyController as vm'
      });
  }
})();

(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('AdminManagerController', AdminManagerController);

  /* @ngInject */
  function AdminManagerController($state, UserService, ManagerService, $uibModal, ngNotify) {
    var vm = this;
    vm.managers = [];
    vm.createManager = createManager;
    vm.updateManager = updateManager;
    vm.deleteManager = deleteManager;

    activate();
    getManagers();

    function activate() {
      UserService.verifyCredentials();
      if (!UserService.getPermissions()) {
        $state.go('home.dashboard');
        ngNotify.set('Insufficient permissions', 'error');
      }
    }

    function getManagers() {
      ManagerService.getManagers()
        .then(function(managersData) {
          vm.managers = managersData.data;
        })
        .catch(function(error) {
          ngNotify.set('Error loading managers', 'error');
        });
    }

    function createManager() {
      $uibModal.open({
        templateUrl: 'app/components/admin/manager/create/create.html',
        controller: 'CreateManagerController as vm',
        resolve: {
          managers: function() {
            return vm.managers;
          }
        }
      });
    }

    function updateManager(manager) {
      $uibModal.open({
        templateUrl: 'app/components/admin/manager/update/update.html',
        controller: 'UpdateManagerController as vm',
        resolve: {
          manager: function() {
            return manager;
          }
        }
      });
    }

    function deleteManager(manager) {
      $uibModal.open({
        templateUrl: 'app/components/admin/manager/delete/delete.html',
        controller: 'DeleteManagerController as vm',
        resolve: {
          manager: function() {
            return manager;
          }
        }
      });
    }

  }

})();

(function() {
  'use strict';

  angular
    .module('app.admin')
    .config(routesConfiguration);

  /* @ngInject */
  function routesConfiguration($stateProvider) {
    $stateProvider
      .state('home.manager', {
        url: '/admin/manager',
        templateUrl: 'app/components/admin/manager/admin-manager.html',
        controller: 'AdminManagerController as vm'
      });
  }
})();

(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('AdminProjectController', AdminProjectController);

  /* @ngInject */
  function AdminProjectController($state, UserService, ProjectService, $uibModal, ngNotify) {
    var vm = this;
    vm.projects = [];
    vm.createProject = createProject;
    vm.updateProject = updateProject;
    vm.deleteProject = deleteProject;
    vm.isAdmin = UserService.getPermissions();
    vm.user = UserService.getCurrentUser();

    showProjects();

    function showProjects() {
      UserService.verifyCredentials();
      if (vm.isAdmin) {
        getProjects();
      }
      getProjectsByUser();
    }

    function getProjects() {
      ProjectService.getProjects()
        .then(function(projectsData) {
          vm.projects = projectsData.data;
        })
        .catch(function(error) {
          ngNotify.set('Error loading project', 'error');
        });
    }

    function getProjectsByUser(user) {
      ProjectService.getProjectsByUser(vm.user)
        .then(function(projectsData) {
          vm.projects = projectsData.data;
        })
        .catch(function(error) {
          ngNotify.set('Error loading project', 'error');
        });
    }

    function createProject() {
      $uibModal.open({
        templateUrl: 'app/components/admin/project/create/create.html',
        controller: 'CreateProjectController as vm',
        resolve: {
          projects: function() {
            return vm.projects;
          }
        }
      });
    }

    function updateProject(project) {
      $uibModal.open({
        templateUrl: 'app/components/admin/project/update/update.html',
        controller: 'UpdateProjectController as vm',
        resolve: {
          project: function() {
            return project;
          }
        }
      });
    }

    function deleteProject(project) {
      $uibModal.open({
        templateUrl: 'app/components/admin/project/delete/delete.html',
        controller: 'DeleteProjectController as vm',
        resolve: {
          project: function() {
            return project;
          }
        }
      });
    }

  }

})();

(function() {
  'use strict';

  angular
    .module('app.admin')
    .config(routesConfiguration);

  /* @ngInject */
  function routesConfiguration($stateProvider) {
    $stateProvider
      .state('home.project', {
        url: '/admin/project',
        templateUrl: 'app/components/admin/project/admin-project.html',
        controller: 'AdminProjectController as vm'
      });
  }
})();

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
      UserService.verifyCredentials();
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

(function() {
  'use strict';

  angular
    .module('app.admin')
    .config(routesConfiguration);

  /* @ngInject */
  function routesConfiguration($stateProvider) {
    $stateProvider
      .state('home.survey', {
        url: '/admin/survey',
        templateUrl: 'app/components/admin/survey/admin-survey.html',
        controller: 'AdminSurveyController as vm'
      })
      .state('home.metric', {
        url: '/admin/survey/metric/:surveyId',
        templateUrl: 'app/components/admin/survey/metric/admin-metric.html',
        controller: 'AdminMetricController as vm'
      });
  }
})();

(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('AdminUserController', AdminUserController);

  /* @ngInject */
  function AdminUserController($state, UserService, $uibModal, ngNotify) {
    var vm = this;
    vm.users = [];
    vm.createUser = createUser;
    vm.updateUser = updateUser;
    vm.deleteUser = deleteUser;

    activate();
    getUsers();

    function activate() {
      UserService.verifyCredentials();
      if (!UserService.getPermissions()) {
        $state.go('home.dashboard');
        ngNotify.set('Insufficient permissions', 'error');
      }
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

    function createUser() {
      $uibModal.open({
        templateUrl: 'app/components/admin/user/create/create.html',
        controller: 'CreateUserController as vm',
        resolve: {
          users: function() {
            return vm.users;
          }
        }
      });
    }

    function updateUser(user) {
      $uibModal.open({
        templateUrl: 'app/components/admin/user/update/update.html',
        controller: 'UpdateUserController as vm',
        resolve: {
          user: function() {
            return user;
          }
        }
      });
    }

    function deleteUser(user) {
      $uibModal.open({
        templateUrl: 'app/components/admin/user/delete/delete.html',
        controller: 'DeleteUserController as vm',
        resolve: {
          user: function() {
            return user;
          }
        }
      });
    }

  }

})();

(function() {
  'use strict';

  angular
    .module('app.admin')
    .config(routesConfiguration);

  /* @ngInject */
  function routesConfiguration($stateProvider) {
    $stateProvider
      .state('home.user', {
        url: '/admin/user',
        templateUrl: 'app/components/admin/user/admin-user.html',
        controller: 'AdminUserController as vm'
      });
  }
})();

(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('AdminMenuController', AdminMenuController);

  /* @ngInject */
  function AdminMenuController(UserService, $state, ngNotify) {
    var vm = this;
    vm.visible = UserService.getPermissions();
    vm.isActive = isActive;
    activate();

    function activate() {
      UserService.verifyCredentials();
    }

    function isActive(viewLocation) {
      return viewLocation === $state.current.name;
    }

  }
})();

(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller(
      'AnswerController',
      AnswerController
      );

  /* @ngInject */
  function AnswerController(AnswerService, ngNotify, RESOURCE, $scope, UserService) {
    var vm = this;
    vm.answers = [];
    vm.getMetric = getMetric;

    activate();
    getMetric('general');
    $scope.$on('getMetric', function(event, path) { getMetric(path); });

    function activate() {
      UserService.verifyCredentials();
    }

    function getColor(value) {
      return RESOURCE.PALETTE[Math.round(value / 10)];
    }

    function getMetric(path) {
      vm.answers = [];
      AnswerService.getMetric(path)
        .then(function(data) {
          _.forEach(data.data, function(value, key) {
            var metric = {};
            metric.id = value.id;
            metric.name = value.name;
            metric.value = (value.value * 100) / 5;
            metric.color = getColor(metric.value);
            vm.answers.push(metric);
          });
        })
        .catch(function(error) {
          ngNotify.set('Error loading indicators', 'error');
        });
    }

  }
})();

(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('NavController', NavController);

  /* @ngInject */
  function NavController($state, UserService, ngNotify) {
    var vm = this;
    vm.user = {};
    vm.userType = {};
    vm.getUser = getUser;
    vm.isActive = isActive;
    vm.logout = logout;
    vm.setAdminId = setAdminId;
    activate();
    getUser();
    setAdminId();

    function activate() {
      UserService.verifyCredentials();
    }

    function isActive(viewLocation) {
      return viewLocation === $state.current.name;
    }

    function getUser() {
      vm.user = UserService.getCurrentUser();
    }

    function logout() {
      UserService.clearCurrentUser();
      $state.go('login');
    }

    function setAdminId() {
      UserService.getUserTypeByName('Administrator')
        .then(function(UserData) {
          vm.userType = UserData.data;
          UserService.setCurrentAdminId(vm.userType);
        })
        .catch(function(error) {
          ngNotify.set('Error loading permissions', 'error');
        });
    }

  }
})();

(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller(
      'ProjectController',
      ProjectController
      );

  /* @ngInject */
  function ProjectController(ProjectService, ngNotify) {
    var vm = this;
    vm.projects = [];
    vm.datapoints = [];
    vm.datacolumns = [{'id': 'top-1', 'type': 'bar', 'name': 'Projects'}];
    vm.datax = {'id': 'x'};

    getProjects();

    function getProjects() {
      var tmpList = [];
      ProjectService.getProjects()
        .then(function(projectsData) {
          vm.projects = projectsData.data;
          _.forEach(projectsData.data, function(value, key) {
            vm.datapoints.push({'x': value.name + ' - ' + value.onTrack.name, 'top-1': value.percentage});
          });
        })
        .catch(function(error) {
          ngNotify.set('Error loading projects', 'error');
        });
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('app.service')
    .service('AnswerService', AnswerService);

  /* @ngInject */
  function AnswerService(UserService, $http, RESOURCE, $base64) {
    this.getMetric = getMetric;
    this.createAnswerList = createAnswerList;
    this.buildAnswers = buildAnswers;

    function getMetric(path) {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'answer/' + path,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': UserService.getAuthorization()
        }
      };

      return $http(request);
    }

    function createAnswer(answer) {
      var postRequest = {
        method: 'POST',
        url:  RESOURCE.API_URL + 'answer',
        headers: {
          'Content-Type': 'application/json'
        },
        data: answer
      };

      return $http(postRequest);
    }

    function createAnswerList(answerList) {
      _.forEach(answerList, function(value, key) {
        createAnswer(value);
      });
    }

    function buildAnswers(idUser, answers) {
      var simpleAnswers = [];
      _.forEach(answers, function(value, key) {
        var answer = {};
        answer.user = {id: idUser};
        answer.metric = {id: key};
        answer.value = value;
        simpleAnswers.push(answer);
      });
      return simpleAnswers;
    }

  }

})();

(function() {
  'use strict';

  angular
    .module('app.service')
    .service('CompanyService', CompanyService);

  /* @ngInject */
  function CompanyService(UserService, $http, RESOURCE, $base64) {

    this.getCompanies = getCompanies;
    this.getCompany = getCompany;
    this.createCompany = createCompany;
    this.updateCompany = updateCompany;
    this.changeStateCompany = changeStateCompany;

    function getCompanies() {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'company',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': UserService.getAuthorization()
        }
      };

      return $http(request);
    }

    function getCompany(company) {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'company/' + company.id,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': UserService.getAuthorization()
        }
      };

      return $http(request);
    }

    function createCompany(company) {
      var postRequest = {
        method: 'POST',
        url:  RESOURCE.API_URL + 'company',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': UserService.getAuthorization()
        },
        data: company
      };

      return $http(postRequest);
    }

    function updateCompany(company) {
      var postRequest = {
        method: 'PUT',
        url:  RESOURCE.API_URL + 'company',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': UserService.getAuthorization()
        },
        data: company
      };

      return $http(postRequest);
    }

    function changeStateCompany(company) {
      var postRequest = {
        method: 'PUT',
        url:  RESOURCE.API_URL + 'company/changeState',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': UserService.getAuthorization()
        },
        data: company
      };

      return $http(postRequest);
    }

  }

})();

(function() {
  'use strict';

  angular
    .module('app.service')
    .service('LoginService', LoginService);

  /* @ngInject */
  function LoginService($http, RESOURCE) {
    this.getUser = getUser;

    function getUser(loginObject) {
      var postRequest = {
        method: 'POST',
        url:  RESOURCE.API_URL + 'login',
        headers: {
          'Content-Type': 'application/json'
        },
        data: loginObject
      };

      return $http(postRequest);
    }
  }

})();

(function() {
  'use strict';

  angular
    .module('app.service')
    .service('ManagerService', ManagerService);

  /* @ngInject */
  function ManagerService(UserService, $http, RESOURCE, $base64) {

    this.getManagers = getManagers;
    this.getManager = getManager;
    this.createManager = createManager;
    this.updateManager = updateManager;
    this.changeStateManager = changeStateManager;

    function getManagers() {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'manager',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': UserService.getAuthorization()
        }
      };

      return $http(request);
    }

    function getManager(manager) {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'manager/' + manager.id,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': UserService.getAuthorization()
        }
      };

      return $http(request);
    }

    function createManager(manager) {
      var postRequest = {
        method: 'POST',
        url:  RESOURCE.API_URL + 'manager',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': UserService.getAuthorization()
        },
        data: manager
      };

      return $http(postRequest);
    }

    function updateManager(manager) {
      var postRequest = {
        method: 'PUT',
        url:  RESOURCE.API_URL + 'manager',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': UserService.getAuthorization()
        },
        data: manager
      };

      return $http(postRequest);
    }

    function changeStateManager(manager) {
      var postRequest = {
        method: 'PUT',
        url:  RESOURCE.API_URL + 'manager/changeState',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': UserService.getAuthorization()
        },
        data: manager
      };

      return $http(postRequest);
    }

  }

})();

(function() {
  'use strict';

  angular
    .module('app.service')
    .service('MetricService', MetricService);

  /* @ngInject */
  function MetricService(UserService, $http, RESOURCE, $base64) {

    this.getMetricsBySurvey = getMetricsBySurvey;
    this.getMetric = getMetric;
    this.createMetric = createMetric;
    this.updateMetric = updateMetric;
    this.changeStateMetric = changeStateMetric;

    function getMetricsBySurvey(survey) {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'metric/bySurvey/' + survey.id,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return $http(request);
    }

    function getMetric(metric) {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'metric/' + metric.id,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': UserService.getAuthorization()
        }
      };

      return $http(request);
    }

    function createMetric(metric) {
      var postRequest = {
        method: 'POST',
        url:  RESOURCE.API_URL + 'metric',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': UserService.getAuthorization()
        },
        data: metric
      };

      return $http(postRequest);
    }

    function updateMetric(metric) {
      var postRequest = {
        method: 'PUT',
        url:  RESOURCE.API_URL + 'metric',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': UserService.getAuthorization()
        },
        data: metric
      };

      return $http(postRequest);
    }

    function changeStateMetric(metric) {
      var postRequest = {
        method: 'PUT',
        url:  RESOURCE.API_URL + 'metric/changeState',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': UserService.getAuthorization()
        },
        data: metric
      };

      return $http(postRequest);
    }

  }

})();

(function() {
  'use strict';

  angular
    .module('app.service')
    .service('ObjectService', ObjectService);

  /* @ngInject */
  function ObjectService() {

    this.parseObject = parseObject;

    function parseObject(data) {
      if (typeof(data) === 'string') {
        return JSON.parse(data);
      }
      return data;
    }

  }

})();

(function() {
  'use strict';

  angular
    .module('app.service')
    .service('OnTrackService', OnTrackService);

  /* @ngInject */
  function OnTrackService(UserService, $http, RESOURCE, $base64) {
    this.getOnTrack = getOnTrack;

    function getOnTrack() {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'onTrack',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': UserService.getAuthorization()
        }
      };

      return $http(request);
    }

  }

})();

(function() {
  'use strict';

  angular
    .module('app.service')
    .service('ProjectService', ProjectService);

  /* @ngInject */
  function ProjectService(UserService, $http, RESOURCE, $base64) {

    this.getProjects = getProjects;
    this.getProjectsByUser = getProjectsByUser;
    this.getProject = getProject;
    this.createProject = createProject;
    this.updateProject = updateProject;
    this.changeStateProject = changeStateProject;

    function getProjects() {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'project',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': UserService.getAuthorization()
        }
      };

      return $http(request);
    }

    function getProjectsByUser(user) {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'project/byUser/' + user.id,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': UserService.getAuthorization()
        }
      };

      return $http(request);
    }

    function getProject(project) {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'project/' + project.id,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': UserService.getAuthorization()
        }
      };

      return $http(request);
    }

    function createProject(project) {
      var postRequest = {
        method: 'POST',
        url:  RESOURCE.API_URL + 'project',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': UserService.getAuthorization()
        },
        data: project
      };

      return $http(postRequest);
    }

    function updateProject(project) {
      var postRequest = {
        method: 'PUT',
        url:  RESOURCE.API_URL + 'project',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': UserService.getAuthorization()
        },
        data: project
      };

      return $http(postRequest);
    }

    function changeStateProject(project) {
      var postRequest = {
        method: 'PUT',
        url:  RESOURCE.API_URL + 'project/changeState',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': UserService.getAuthorization()
        },
        data: project
      };

      return $http(postRequest);
    }

  }

})();

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
          'Content-Type': 'application/json'
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

(function() {
  'use strict';

  angular
    .module('app.service')
    .service('UserService', UserService);

  /* @ngInject */
  function UserService($http, RESOURCE, $window, $state, ngNotify, $base64) {
    this.getUserTypes = getUserTypes;
    this.getUserTypeByName = getUserTypeByName;
    this.getUsers = getUsers;
    this.getUser = getUser;
    this.createUser = createUser;
    this.updateUser = updateUser;
    this.setCurrentUser = setCurrentUser;
    this.getCurrentUser = getCurrentUser;
    this.clearCurrentUser = clearCurrentUser;
    this.changeStateUser = changeStateUser;
    this.setCurrentAdminId = setCurrentAdminId;
    this.getCurrentAdminId = getCurrentAdminId;
    this.getPermissions = getPermissions;
    this.verifyCredentials = verifyCredentials;
    this.getAuthorization = getAuthorization;

    function getUserTypes() {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'userType',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getAuthorization()
        }
      };

      return $http(request);
    }

    function getUserTypeByName(name) {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'userType/byName/' + name,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getAuthorization()
        }
      };

      return $http(request);
    }

    function getUsers() {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'user',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getAuthorization()
        }
      };

      return $http(request);
    }

    function getUser(user) {
      var request = {
        method: 'GET',
        url: RESOURCE.API_URL + 'user/' + user.id,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return $http(request);
    }

    function createUser(user) {
      var postRequest = {
        method: 'POST',
        url:  RESOURCE.API_URL + 'user',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getAuthorization()
        },
        data: user
      };

      return $http(postRequest);
    }

    function updateUser(user) {
      var postRequest = {
        method: 'PUT',
        url:  RESOURCE.API_URL + 'user',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getAuthorization()
        },
        data: user
      };

      return $http(postRequest);
    }

    function changeStateUser(user) {
      var postRequest = {
        method: 'PUT',
        url:  RESOURCE.API_URL + 'user/changeState',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getAuthorization()
        },
        data: user
      };

      return $http(postRequest);
    }

    function setCurrentUser(user) {
      sessionStorage.setItem('CurrentUser', JSON.stringify(user));
    }

    function getCurrentUser() {
      return JSON.parse(sessionStorage.getItem('CurrentUser'));
    }

    function clearCurrentUser() {
      setCurrentUser(null);
    }

    function setCurrentAdminId(userType) {
      sessionStorage.setItem('CurrentAdminId', JSON.stringify(userType));
    }

    function getCurrentAdminId() {
      return JSON.parse(sessionStorage.getItem('CurrentAdminId'));
    }

    function getPermissions() {
      return getCurrentUser().userType.id == getCurrentAdminId().id;
    }

    function verifyCredentials() {
      if (getCurrentUser() == null) {
        ngNotify.set('session required', 'error');
        $state.go('login');
      }
    }

    function getAuthorization() {
      var user = getCurrentUser();
      return 'Basic ' + $base64.encode(user.email + ':' + user.password);
    }

  }

})();

(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('CreateCompanyController', CreateCompanyController);

  /* @ngInject */
  function CreateCompanyController(CompanyService, $uibModalInstance, ngNotify, companies) {
    var vm = this;
    vm.company = {};
    vm.companies = companies;
    vm.createCompany = createCompany;
    vm.close = close;

    function close() {
      $uibModalInstance.dismiss('cancel');
    }

    function createCompany() {
      vm.company.active = true;
      CompanyService.createCompany(vm.company)
        .then(function(data) {
          vm.companies.push(vm.company);
          vm.company = {};
          ngNotify.set('Company has been created successfully', 'success');
        })
        .catch(function(error) {
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      close();
    }

  }

})();

(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('UpdateCompanyController', UpdateCompanyController);

  /* @ngInject */
  function UpdateCompanyController(CompanyService, $uibModalInstance, company, ngNotify) {
    var vm = this;
    vm.close = close;
    vm.company = company;
    vm.updateCompany = updateCompany;

    function close() {
      $uibModalInstance.dismiss('cancel');
    }

    function updateCompany() {
      CompanyService.updateCompany(vm.company)
        .then(function(data) {
          vm.company = {};
          ngNotify.set('Company has been updated successfully', 'success');
        })
        .catch(function(error) {
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      close();
    }

  }

})();

(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('DeleteCompanyController', DeleteCompanyController);

  /* @ngInject */
  function DeleteCompanyController(CompanyService, $uibModalInstance, company, ngNotify) {
    var vm = this;
    vm.close = close;
    vm.company = company;
    vm.deleteCompany = deleteCompany;

    function close() {
      $uibModalInstance.dismiss('cancel');
    }

    function deleteCompany() {
      CompanyService.changeStateCompany(vm.company)
        .then(function(data) {
          vm.company.active = !vm.company.active;
          ngNotify.set('Company has been updated successfully', 'success');
        })
        .catch(function(error) {
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      close();
    }

  }

})();

(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('CreateManagerController', CreateManagerController);

  /* @ngInject */
  function CreateManagerController(
      ManagerService,
      CompanyService,
      managers,
      $uibModalInstance,
      ngNotify) {
    var vm = this;
    vm.managers = managers;
    vm.company = {};
    vm.companies = [];
    vm.close = close;
    vm.createManager = createManager;

    getCompanies();

    function close() {
      $uibModalInstance.dismiss('cancel');
    }

    function getCompanies() {
      CompanyService.getCompanies()
        .then(function(companiesData) {
          vm.companies = companiesData.data;
        })
        .catch(function(error) {
          vm.companies = [];
          ngNotify.set('Error loading companies', 'error');
        });
    }

    function createManager() {
      vm.manager.active = true;
      vm.manager.company = JSON.parse(vm.company);
      ManagerService.createManager(vm.manager)
        .then(function(data) {
          vm.managers.push(vm.manager);
          vm.manager = {};
          ngNotify.set('Manager has been created successfully', 'success');
        })
        .catch(function(error) {
          vm.manager = {};
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      close();
    }

  }

})();

(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('DeleteManagerController', DeleteManagerController);

  /* @ngInject */
  function DeleteManagerController(
      ManagerService,
      manager,
      $uibModalInstance,
      ngNotify) {
    var vm = this;
    vm.manager = manager;
    vm.close = close;
    vm.deleteManager = deleteManager;

    function close() {
      $uibModalInstance.dismiss('cancel');
    }

    function deleteManager() {
      ManagerService.changeStateManager(vm.manager)
        .then(function(data) {
          vm.manager.active = !vm.manager.active;
          ngNotify.set('Manager has been updated successfully', 'success');
        })
        .catch(function(error) {
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      close();
    }

  }

})();

(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('UpdateManagerController', UpdateManagerController);

  /* @ngInject */
  function UpdateManagerController(
      ManagerService,
      CompanyService,
      ObjectService,
      $uibModalInstance,
      manager,
      ngNotify) {
    var vm = this;
    vm.manager = manager;
    vm.company = manager.company;
    vm.companies = [];
    vm.close = close;
    vm.updateManager = updateManager;

    getCompanies();

    function close() {
      $uibModalInstance.dismiss('cancel');
    }

    function getCompanies() {
      CompanyService.getCompanies()
        .then(function(companiesData) {
          vm.companies = companiesData.data;
        })
        .catch(function(error) {
          ngNotify.set('Error loading companies', 'error');
        });
    }

    function updateManager() {
      vm.manager.company = ObjectService.parseObject(vm.manager.company);
      ManagerService.updateManager(vm.manager)
        .then(function(data) {
          vm.manager = {};
          ngNotify.set('Manager has been updated successfully', 'success');
        })
        .catch(function(error) {
          vm.manager = {};
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      close();
    }

  }

})();

(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('CreateProjectController', CreateProjectController);

  /* @ngInject */
  function CreateProjectController(UserService,
                                   OnTrackService,
                                   ProjectService,
                                   projects,
                                   $uibModalInstance,
                                   $filter,
                                   RESOURCE,
                                   ngNotify) {
    var vm = this;
    vm.projects = projects;
    vm.onTrackList = [];
    vm.project = {};
    vm.closeModal = closeModal;
    vm.onTrack = {};
    vm.user = UserService.getCurrentUser();
    vm.createProject = createProject;
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
      vm.project.onTrack = JSON.parse(vm.onTrack);
      vm.project.user = vm.user;
      vm.project.active = true;
    }

    function createProject() {
      loadModels();
      ProjectService.createProject(vm.project)
        .then(function(data) {
          vm.projects.push(vm.project);
          vm.project = {};
          ngNotify.set('Project has been created successfully', 'success');
        })
        .catch(function(error) {
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      closeModal();
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

(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('DeleteProjectController', DeleteProjectController);

  /* @ngInject */
  function DeleteProjectController(ProjectService,
                                   project,
                                   $uibModalInstance,
                                   ngNotify) {
    var vm = this;
    vm.project = project;
    vm.closeModal = closeModal;
    vm.deleteProject = deleteProject;

    function closeModal() {
      $uibModalInstance.dismiss('cancel');
    }

    function deleteProject() {
      ProjectService.changeStateProject(vm.project)
        .then(function(data) {
          vm.project.active = !vm.project.active;
          ngNotify.set('Project has been updated successfully', 'success');
        })
        .catch(function(error) {
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      closeModal();
    }

  }

})();

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

(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('CreateSurveyController', CreateSurveyController);

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

(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('AdminMetricController', AdminMetricController);

  /* @ngInject */
  function AdminMetricController(
      SurveyService,
      MetricService,
      $uibModal,
      ngNotify,
      $stateParams) {
    var vm = this;
    vm.metrics = [];
    vm.createMetric = createMetric;
    vm.updateMetric = updateMetric;
    vm.deleteMetric = deleteMetric;
    vm.survey = {};
    vm.survey.id = $stateParams.surveyId;

    getSurvey();
    getMetrics();

    function getSurvey() {
      SurveyService.getSurvey(vm.survey)
        .then(function(surveyData) {
          vm.survey = surveyData.data;
        })
        .catch(function(error) {
          ngNotify.set('Error loading survey information', 'error');
        });
    }

    function getMetrics() {
      MetricService.getMetricsBySurvey(vm.survey)
        .then(function(metricsData) {
          vm.metrics = metricsData.data;
        })
        .catch(function(error) {
          ngNotify.set('Error loading metrics', 'error');
        });
    }

    function createMetric() {
      $uibModal.open({
        templateUrl: 'app/components/admin/survey/metric/create/create.html',
        controller: 'CreateMetricController as vm',
        resolve: {
          metrics: function() {
            return vm.metrics;
          },
          survey: function() {
            return vm.survey;
          }
        }
      });
    }

    function updateMetric(metric) {
      $uibModal.open({
        templateUrl: 'app/components/admin/survey/metric/update/update.html',
        controller: 'UpdateMetricController as vm',
        resolve: {
          metric: function() {
            return metric;
          },
          survey: function() {
            return vm.survey;
          }
        }
      });
    }

    function deleteMetric(metric) {
      $uibModal.open({
        templateUrl: 'app/components/admin/survey/metric/delete/delete.html',
        controller: 'DeleteMetricController as vm',
        resolve: {
          metric: function() {
            return metric;
          },
          survey: function() {
            return vm.survey;
          }
        }
      });
    }

  }

})();

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

(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('CreateUserController', CreateUserController);

  /* @ngInject */
  function CreateUserController(
      ManagerService,
      UserService,
      users,
      $uibModalInstance,
      ngNotify) {
    var vm = this;
    vm.managers = [];
    vm.manager = {};
    vm.userTypes = [];
    vm.userType = {};
    vm.user = {};
    vm.users = users;
    vm.createUser = createUser;
    vm.close = close;

    getManagers();
    getUserTypes();

    function close() {
      $uibModalInstance.dismiss('cancel');
    }

    function getManagers() {
      ManagerService.getManagers()
        .then(function(managersData) {
          vm.managers = managersData.data;
        })
        .catch(function(error) {
          ngNotify.set('Error loading user types', 'error');
        });
    }

    function getUserTypes() {
      UserService.getUserTypes()
        .then(function(userTypesData) {
          vm.userTypes = userTypesData.data;
        })
        .catch(function(error) {
          ngNotify.set('Error loading user types', 'error');
        });
    }

    function createUser() {
      vm.user.active = true;
      vm.user.manager = JSON.parse(vm.manager);
      vm.user.userType = JSON.parse(vm.userType);
      UserService.createUser(vm.user)
        .then(function(data) {
          vm.users.push(vm.user);
          vm.user = {};
          ngNotify.set('User has been created successfully', 'success');
        })
        .catch(function(error) {
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      close();
    }

  }

})();

(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('DeleteUserController', DeleteUserController);

  /* @ngInject */
  function DeleteUserController(
      UserService,
      user,
      $uibModalInstance,
      ngNotify) {
    var vm = this;
    vm.close = close;
    vm.user = user;
    vm.deleteUser = deleteUser;

    function close() {
      $uibModalInstance.dismiss('cancel');
    }

    function deleteUser() {
      UserService.changeStateUser(vm.user)
        .then(function(data) {
          vm.user.active = !vm.user.active;
          ngNotify.set('User has been updated successfully', 'success');
        })
        .catch(function(error) {
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      close();
    }

  }

})();

(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('UpdateUserController', UpdateUserController);

  /* @ngInject */
  function UpdateUserController(
      ManagerService,
      UserService,
      user,
      $uibModalInstance,
      ngNotify) {
    var vm = this;
    vm.managers = [];
    vm.manager = {};
    vm.userTypes = [];
    vm.userType = {};
    vm.user = user;
    vm.updateUser = updateUser;
    vm.close = close;

    getManagers();
    getUserTypes();

    function close() {
      $uibModalInstance.dismiss('cancel');
    }

    function getManagers() {
      ManagerService.getManagers()
        .then(function(managersData) {
          vm.managers = managersData.data;
        })
        .catch(function(error) {
          ngNotify.set('Error loading user types', 'error');
        });
    }

    function getUserTypes() {
      UserService.getUserTypes()
        .then(function(userTypesData) {
          vm.userTypes = userTypesData.data;
        })
        .catch(function(error) {
          ngNotify.set('Error loading user types', 'error');
        });
    }

    function updateUser() {
      vm.user.manager = JSON.parse(vm.manager);
      vm.user.userType = JSON.parse(vm.userType);
      UserService.updateUser(vm.user)
        .then(function(data) {
          vm.user = {};
          ngNotify.set('User has been updated successfully', 'success');
        })
        .catch(function(error) {
          vm.user = {};
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      close();
    }

  }

})();

(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('CreateMetricController', CreateMetricController);

  /* @ngInject */
  function CreateMetricController(
      MetricService,
      survey,
      metrics,
      $uibModalInstance,
      ngNotify) {
    var vm = this;
    vm.metric = {};
    vm.survey = survey;
    vm.metrics = metrics;
    vm.createMetric = createMetric;
    vm.close = close;

    function close() {
      $uibModalInstance.dismiss('cancel');
    }

    function createMetric() {
      vm.metric.active = true;
      vm.metric.survey = vm.survey;
      MetricService.createMetric(vm.metric)
        .then(function(data) {
          vm.metrics.push(vm.metric);
          ngNotify.set('Metric has been created successfully', 'success');
        })
        .catch(function(error) {
          vm.metric = {};
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      close();
    }

  }

})();

(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('DeleteMetricController', DeleteMetricController);

  /* @ngInject */
  function DeleteMetricController(
      MetricService,
      metric,
      survey,
      $uibModalInstance,
      ngNotify) {
    var vm = this;
    vm.metric = metric;
    vm.survey = survey;
    vm.close = close;
    vm.deleteMetric = deleteMetric;

    function close() {
      $uibModalInstance.dismiss('cancel');
    }

    function deleteMetric() {
      vm.metric.survey = vm.survey;
      MetricService.changeStateMetric(vm.metric)
        .then(function(data) {
          vm.metric.active = !vm.metric.active;
          ngNotify.set('Metric has been updated successfully', 'success');
        })
        .catch(function(error) {
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      close();
    }

  }

})();

(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('UpdateMetricController', UpdateMetricController);

  /* @ngInject */
  function UpdateMetricController(
      MetricService,
      metric,
      survey,
      $uibModalInstance,
      ngNotify) {
    var vm = this;
    vm.metric = metric
    vm.survey = survey;
    vm.close = close;
    vm.updateMetric = updateMetric;

    function close() {
      $uibModalInstance.dismiss('cancel');
    }

    function updateMetric() {
      vm.metric.survey = vm.survey;
      MetricService.updateMetric(vm.metric)
        .then(function(data) {
          ngNotify.set('Metric has been updated successfully', 'success');
        })
        .catch(function(error) {
          vm.metric = {};
          ngNotify.set('An error has been occurred, please try again', 'error');
        });
      close();
    }

  }

})();
