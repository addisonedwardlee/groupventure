'use strict';
 
angular.module('socialApp.controllers.socialTeams', ['socialApp.services.socialTeams'])
  .controller('SocialTeamsController', ['$scope','$routeParams', '$location', 'angularFire', 'Leagues', 'SocialTeams','FireRef',
    function($scope, $routeParams, $location, angularFire, Leagues, SocialTeams, FireRef) {
 
      $scope.socialTeamId = $routeParams.socialTeamId;
      $scope.noSocialTeam = !$routeParams.socialTeamId;
 
      $scope.findSocialTeams = function() {
        $scope.socialTeams = SocialTeams.collection();
      }
 
      $scope.findOneSocialTeam = function () {
        if(!!$scope.socialTeamId) {
          angularFire(SocialTeams.find($routeParams.socialTeamId), $scope, 'socialTeam');
        }
      }
 
      $scope.findLeagues = function () {
        $scope.leagues = Leagues.collection();
      }
 
      $scope.create = function() {
        SocialTeams.create($scope.socialTeam, $scope.auth).then(function(socialTeamId) {
          $scope.socialTeam = null;
          $location.path('/socialteams/'+socialTeamId);
        })
      }
 
      $scope.removeSocialTeam = function(socialTeamId) {
        SocialTeams.removeSocialTeam(socialTeamId);
      }
    }])