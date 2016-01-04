angular.module('kidmaxServe')

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('kms', {
    url: '/',
    templateUrl: 'views/home.html',
    controller: 'HomeCtlr',
  })
  .state('kms.volunteers', {
    url: 'volunteers/',
    templateUrl: 'views/volunteers.html',
    controller: 'VolunteersCtlr',
  })
  ;
}])
;