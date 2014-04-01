'use strict';
 
angular.module('socialApp.controllers.leagues', ['socialApp.services.leagues'])
  .controller('LeaguesController', ['$scope','$routeParams', '$location', 'angularFire', 'Leagues', 
    function($scope, $routeParams, $location, angularFire, Leagues) {
    
      $scope.leagueId = $routeParams.leagueId;
      $scope.leagueNum = 0;
      $scope.teamNum = 0;

      $scope.$watch('league', function(){
        var teams = Object.keys($scope.league.socialTeams);
        $scope.team = $scope.league.socialTeams[teams[$scope.teamNum]];
      })

      $scope.$watch('teamNum', function(){
        var teams = Object.keys($scope.league.socialTeams);
        $scope.team = $scope.league.socialTeams[teams[$scope.teamNum]];
      })

      $scope.findLeagues = function() {
        $scope.leagues = Leagues.collection();
      }
 
      $scope.findOneLeague = function (leagueId) {
        if(!!$scope.leagueId) {
          angularFire(Leagues.find($routeParams.leagueId), $scope, 'league')
        }
      }

      $scope.findRandomLeague = function () {
        angularFire(Leagues.find("-JJPeBNABfvylEHsi8CV"), $scope, 'league')
        // $scope.findLeagues();
      }
 
      $scope.createLeague = function() {
        var leagueId = Leagues.create($scope.league, $scope.auth, function(err){
                if(!err){
                    $scope.league = null;
                    $location.path('/leagues/'+leagueId);
                    $scope.$apply();
                }
        });
      }
 
      $scope.removeLeague = function(leagueId) {
        Leagues.removeLeague(leagueId);
      }

      $scope.nextTeam = function(){
        // var teams = Object.keys($scope.league.socialTeams);
        // $scope.team = $scope.league.socialTeams[teams[1]];
        $scope.teamNum = $scope.teamNum + 1
      }
}])