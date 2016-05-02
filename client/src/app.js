import angular from 'angular'
import 'angular-ui-router'
angular.module('olympics', ['ui.router'])
.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/sports')

  $stateProvider
  .state('sports', {
    url: '/sports',
    templateUrl: 'sports/sports-nav.html'
  })
})
.controller('sportsController', function($http) {
  $http.get('/sports').then((response) => {
    this.sports = response.data;
  });
})
