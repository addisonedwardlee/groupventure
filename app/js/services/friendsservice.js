'use strict';
 
angular.module('socialApp.services.friends', [])
  .factory('Friends', ['$q', 'angularFireCollection', 'FireRef',
    function($q, angularFireCollection, FireRef) {
      return {
        collection: function(cb) {
          return angularFireCollection(FireRef.users(),cb);
        }
      , find: function(friendId) {
          return FireRef.users().child(friendId);
        }
        //implement add - outstanding //
      , add: function(socialTeam, owner, cb) {
          var deferred = $q.defer();
          var name = FireRef.socialTeams().push({
            leagueId: socialTeam.leagueId,
            time: socialTeam.time,
            name: socialTeam.name,
            participants: participants,
            ownerId: owner.id
          }, cb).name()
          FireRef.leagues().child('/'+socialTeam.leagueId+'/socialTeams/'+name).set(true);
          FireRef.users().child('/'+owner.id+'/socialTeams/'+name).set(true);
          deferred.resolve(name);
          return deferred.promise;
        }
      //implement remove - outstanding //
      , removeFriend: function(socialTeamId) {
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