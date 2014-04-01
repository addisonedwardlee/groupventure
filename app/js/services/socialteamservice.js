'use strict';
 
angular.module('socialApp.services.socialTeams', [])
  .factory('SocialTeams', ['$q', 'angularFireCollection', 'FireRef',
    function($q, angularFireCollection, FireRef) {
      return {
        collection: function(cb) {
          return angularFireCollection(FireRef.socialTeams(),cb);
        }
      , find: function(socialTeamId) {
          return FireRef.socialTeams().child(socialTeamId);
        }
      , create: function(socialTeam, owner, cb) {
          var deferred = $q.defer();
          var name = FireRef.socialTeams().push({
            leagueId: socialTeam.leagueId,
            time: socialTeam.time,
            participants: socialTeam.participants,
            ownerId: owner.id
          }, cb)
          FireRef.leagues().child('/'+socialTeam.leagueId+'/socialTeams/'+name).set(true);
          FireRef.users().child('/'+owner.id+'/socialTeams/'+name).set(true);
          deferred.resolve();
          return deferred.promise;
        }
      , removeSocialTeam: function(socialTeamId) {
          var socialTeam = this.find(socialTeamId);
          socialTeam.once('value',function(data) {
            FireRef.leagues().child('/'+data.val().leagueId).child('/socialTeams/'+socialTeamId).remove();
            FireRef.users().child('/'+data.val().ownerId).child('/socialTeams/'+socialTeamId).remove();
          })
          socialTeam.remove();
          return;
        }
      };
    }])