'use strict';
 
angular.module('socialApp.services.firebaseRefs', [])
  .factory('FireRef', ['FBURL', 'Firebase',
    function(FBURL, Firebase) {
      return {
        leagues: function() {
          return new Firebase(FBURL+'/leagues');
        }

      , users: function() {
          return new Firebase(FBURL+'/users');
        }

      , players: function() {
        return new Firebase(FBURL+'/players');
      }
      
      , socialTeams: function() {
        return new Firebase(FBURL+'/socialTeams');
      }

      }
    }])