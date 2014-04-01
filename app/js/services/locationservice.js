'use strict';
 
angular.module('socialApp.services.locations', ['socialApp.services.firebaseRefs'])
  .factory('Locations', ['angularFireCollection', 'FireRef',
    function(angularFireCollection, FireRef) {
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
      }
    }])