angular.module('myApp.controllers')

.controller('LoginCtrl', ['$rootScope','$scope', '$state', 'firebaseRef', 'sessionService',
	function($rootScope, $scope, $state, firebaseRef, sessionService) {
  	DBG.ctrl('Login');
	
    $scope.connectWithProvider = function(provider){
      loginService.providerLogin(provider, function(err, user) {
        if (!err) {

          //[TODO] Move this into session service
          firebaseRef(['users', user.uid]).once('value', function(userSnap) {
            if (userSnap.val() == null) {
              $state.go('welcome',{firstName: sessionService.getFirstName()});
            } else {
              forgeService.savePushId();
              $state.go('home');
            }
          })
        } else {
          DBG.error('HOMECTLR: Unsuccessful login with ' + provider + '. Error: ' + err);
        }
      })
    }

  }
])