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
  .state('kms.volunteers.details', {
    url: '{volunteerId}/',
    params: { volunteerId: 'new' },
    templateUrl: 'views/volunteer-details.html',
    controller: 'VolunteerDetailsCtlr',
  })
  ;
}])
;