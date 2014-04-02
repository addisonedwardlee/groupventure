'use strict';
 
angular.module('socialApp.services.locations', ['socialApp.services.firebaseRefs'])
  .factory('Locations', ['angularFireCollection', 'FireRef', '$location', 
    function(angularFireCollection, FireRef, $location) {
      return {
        collection: function(cb) {
          return angularFireCollection(FireRef.locations(),cb);
        }
      , find: function(locationId) {
          return FireRef.locations().child('/'+locationId);
        }
      , create: function(location, commissioner, cb) {
         return FireRef.locations().push({
            name: location.name,
            desc: location.desc,
            socialTeams: []
          }, cb).name();
        }
      , removeLocation: function(locationId) {
          var location = FireRef.locations().child('/'+locationId)
          location.remove();
        }
      , sendInvite: function(location, team){
        var name = FireRef.locations().child('/'+team.locationId+'/invites/').push({
            time: team.time,
            participants: team.participants
          }).name();
        $location.path('/invites/'+team.locationId+'/'+name);
      }
      , findInvite: function(locationId, inviteId){
        return FireRef.locations().child('/'+locationId+'/invites/'+inviteId);
      }
      , finalizeInvite: function(){
        $location.path('/locations/final');
      }
    }
  }])