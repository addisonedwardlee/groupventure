'use strict';
 
angular.module('socialApp.controllers.socialTeams', ['socialApp.services.socialTeams', 'socialApp.services.friends'])
  .controller('SocialTeamsController', ['$scope','$routeParams', '$location', 'angularFire', 'Locations', 'SocialTeams', 'Friends', 'FireRef',
    function($scope, $routeParams, $location, angularFire, Locations, SocialTeams, Friends, FireRef) {
 
      $scope.socialTeamId = $routeParams.socialTeamId;
      $scope.noSocialTeam = !$routeParams.socialTeamId;
      $scope.participants = [];
 
      $scope.findSocialTeams = function() {
        $scope.socialTeams = SocialTeams.collection();
      }
 
      $scope.findOneSocialTeam = function () {
        if(!!$scope.socialTeamId) {
          angularFire(SocialTeams.find($routeParams.socialTeamId), $scope, 'socialTeam');
        }
      }
 
      $scope.findLocations = function () {
        $scope.locations = Locations.collection();
      }

      $scope.findFriends = function () {
        $scope.friends = Friends.collection();
      }

      $scope.addFriend = function(friend) {
        $scope.participants.push(friend);
        $scope.socialTeam.friendsId = null;
      }
 
      $scope.create = function() {
        var temp = [];
        $scope.participants.forEach(function(p){
          var tempUser = {};
          tempUser.email = p.email;
          tempUser.img = p.img;
          tempUser.name = p.name;
          temp.push(tempUser);
        });
        $scope.socialTeam.team = temp;
        SocialTeams.create($scope.socialTeam, $scope.auth).then(function(socialTeamId) {
          $scope.socialTeam = null;
          $location.path('/socialteams/'+socialTeamId);
        })
      }
 
      $scope.removeSocialTeam = function(socialTeamId) {
        SocialTeams.removeSocialTeam(socialTeamId);
      }
    }])