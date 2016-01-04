angular.module('kidmaxServe')

.config(['$httpProvider',
function ($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  //$httpProvider.defaults.withCredentials = true;
}])

.config(['$compileProvider',
function ($compileProvider) {
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|itms-services):/);
}])
;