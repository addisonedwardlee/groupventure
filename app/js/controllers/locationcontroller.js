'use strict';
 
angular.module('socialApp.controllers.locations', ['socialApp.services.locations'])
  .controller('LocationsController', ['$scope','$routeParams', '$location', 'angularFire', 'Locations', 'Friends',
    function($scope, $routeParams, $location, angularFire, Locations, Friends) {
    
      $scope.locationId = $routeParams.locationId;
      $scope.locationNum = 0;
      $scope.teamNum = 0;

      $scope.$watch('location', function(){
        var teams = Object.keys($scope.location.socialTeams);
        $scope.team = $scope.location.socialTeams[teams[$scope.teamNum]];
      })

      $scope.$watch('teamNum', function(){
        var teams = Object.keys($scope.location.socialTeams);
        $scope.team = $scope.location.socialTeams[teams[$scope.teamNum]];
      })

      $scope.findLocations = function() {
        $scope.locations = Locations.collection();
      }
 
      $scope.findOneLocation = function (locationId) {
        if(!!$scope.locationId) {
          angularFire(Locations.find($routeParams.locationId), $scope, 'location')
        }
      }

      $scope.findRandomLocation = function (num) {
        $scope.locations = Locations.collection();
        setTimeout(function(){
          $scope.location = $scope.locations[num];
          $scope.$apply();
        }, 500)
      }
 
      $scope.createLocation = function() {
        var locationId = Locations.create($scope.location, $scope.auth, function(err){
                if(!err){
                    $scope.location = null;
                    $location.path('/locations/'+locationId);
                    $scope.$apply();
                }
        });
      }
 
      $scope.removeLocation = function(locationId) {
        Locations.removeLocation(locationId);
      }

      $scope.nextTeam = function(){
        $scope.teamNum = $scope.teamNum + 1
      }

      $scope.nextLocale = function(){
        $scope.findRandomLocation($scope.locationNum);
        $scope.locationNum = $scope.locationNum + 1;
        $scope.team = '';
        $scope.teamNum = 0;
      }
      
      $scope.sendInvite = function(){
        Locations.sendInvite($scope.location, $scope.team);
      }

      $scope.findOneInvite = function(){
        angularFire(Locations.findInvite($routeParams.locationId, $routeParams.inviteId), $scope, 'invite');
        angularFire(Locations.find($routeParams.locationId), $scope, 'location');
      }

      $scope.findFriends = function () {
        $scope.friends = Friends.collection();
      }

      $scope.addFriend = function(friend) {
        $scope.team.participants.push(friend);
        $scope.friendsId = null;
      }

      $scope.finalizeInvite = function(){
        //create write functionality
        Locations.finalizeInvite();
      }
}])