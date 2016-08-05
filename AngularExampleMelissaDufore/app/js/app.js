'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'firebase',
  'ui.bootstrap',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/clock', {templateUrl: 'partials/clock.html', controller: 'EmployeeList'});
  $routeProvider.when('/cards', {templateUrl: 'partials/time-cards.html', controller: 'TimeCards'});
  $routeProvider.when('/set-up', {templateUrl: 'partials/set-up.html', controller: 'SetUp'});
  $routeProvider.otherwise({redirectTo: '/clock'});
}]);
