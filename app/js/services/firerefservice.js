'use strict';
 
angular.module('socialApp.services.firebaseRefs', [])
  .factory('FireRef', ['FBURL', 'Firebase',
    function(FBURL, Firebase) {
      return {
        locations: function() {
          return new Firebase(FBURL+'/locations');
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