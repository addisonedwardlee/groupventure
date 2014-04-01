'use strict';

angular.module('socialApp.controllers.header', ['socialApp.services.login'])
  .controller('HeaderController', ['$scope', '$location', 'loginService', 'angularFire', 'FBURL', 
    function($scope, $location, loginService, angularFire, FBURL) {

      $scope.$on('angularFireAuth:login', function() {
        angularFire(new Firebase(FBURL+'/users/'+$scope.auth.id), $scope, 'user');
      });

      $scope.logout = function() {
        loginService.logout('/signin');
      };

      $scope.navbarEntries = [
        {
          "title": "Players",
          "link": "/players"
        }, {
          "title": "Leagues",
          "link": "/leagues"
        }, {
          "title": "Social Teams",
          "link": "/socialteams"
        }
      ];

      $scope.$on('$routeChangeSuccess', function() {
        $scope.navbarEntries.forEach(
          function(data) {
            data.isActive = ($location.path().indexOf(data.link) == 0);
          }
        )
      })

    }])