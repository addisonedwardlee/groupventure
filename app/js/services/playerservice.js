'use strict';

angular.module('socialApp.services.players', ['socialApp.services.firebaseRefs'])
  .factory('Players', ['FBURL', 'Firebase', 'angularFireCollection', 'FireRef', function(FBURL, Firebase, angularFireCollection, FireRef) {
          return {
            collection: function(){
              return angularFireCollection(FireRef.players())
            }
            , find: function(playerId){
              return FireRef.players().child(playerId);
            }
          }
  }])