'use strict';

// Declare app level module which depends on filters, and services
angular.module('socialApp.config', [])

app.config(['$routeProvider', 
    function($routeProvider) {
      $routeProvider
      .when('/',        { templateUrl: 'views/default.html' })
      .when('/signin',  { templateUrl: 'views/users/signin.html' })
      .when('/signup',  { templateUrl: 'views/users/signup.html' })
      .when('/seeAll', { templateUrl: 'views/locations/random.html', authRequired: true })
      .when('/invites/:locationId/:inviteId', { templateUrl: 'views/locations/view.html', authRequired: true })
      .when('/locations', { templateUrl: 'views/locations/list.html', authRequired: true })
      .when('/locations/create', { templateUrl: 'views/locations/edit.html', authRequired: true })
      .when('/locations/final', { templateUrl: 'views/locations/final.html', authRequired: true })
      .when('/locations/:locationId', { templateUrl: 'views/locations/view.html', authRequired: true })
      .when('/locations/:locationId/edit', { templateUrl: 'views/locations/edit.html', authRequired: true })
      .when('/players', {templateUrl: 'views/players/list.html', authRequired: true})
      .when('/players/:playerId', {templateUrl: 'views/players/view.html', authRequired: true})
       .when('/socialteams', { templateUrl: 'views/socialteams/list.html', authRequired: true })
      .when('/socialteams/create', { templateUrl: 'views/socialteams/edit.html', authRequired: true })
      .when('/socialteams/:socialTeamId', { templateUrl: 'views/socialteams/view.html', authRequired: true })
      .when('/socialteams/:socialTeamId/edit', { templateUrl: 'views/socialteams/edit.html', authRequired: true })
      .otherwise({ redirectTo: '/' });
    }])
  
  // establish authentication
  .run(['angularFireAuth', 'FBURL', '$rootScope', 
    function(angularFireAuth, FBURL, $rootScope) {
      angularFireAuth.initialize(new Firebase(FBURL), {scope: $rootScope, name: 'auth', path: '/signin'});
      $rootScope.FBURL = FBURL;
    }])

  // your Firebase URL goes here
  // should look something like: https://blahblahblah.firebaseio.com
  .constant('FBURL', 'https://brilliant-fire-1683.firebaseio.com')


