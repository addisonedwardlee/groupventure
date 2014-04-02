'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('socialApp',
  [ 'socialApp.config'
  , 'socialApp.controllers.header'
  , 'socialApp.controllers.signin'
  , 'socialApp.controllers.signup'
  , 'socialApp.controllers.locations'
  , 'socialApp.controllers.socialTeams'
  , 'firebase', 'ui.bootstrap', 'ngRoute']
  )
