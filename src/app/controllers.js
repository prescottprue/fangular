angular.module('myApp.controllers', ['myApp.services','famous.angular', 'firebase'])

.controller('RootCtrl', ['$rootScope', '$scope',
	function($rootScope, $scope){
  	DBG.ctrl('Root');
		// Authentication listener
		$rootScope.$on("$firebaseSimpleLogin:login", function(e, user) {
  		console.log("User " + user.id + " successfully logged in!");
		});

    $scope.isNull = function(item) {
      return isEmpty(item);
    }

	}
])