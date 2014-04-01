'use strict';

angular.module('socialApp.controllers.players', ['socialApp.services.players'])
  .controller('PlayersController', ['$scope', '$routeParams', 'angularFire', 'Players',
    function($scope, $routeParams, angularFire, Players){

      $scope.searchsize = {'limit': 10};
      $scope.strictsearch = {};

      $scope.findPlayers = function(){
        $scope.players = Players.collection();
      }

      $scope.findOnePlayer = function(){
        angularFire(Players.find($routeParams.playerId), $scope, 'player')
      }
  }])