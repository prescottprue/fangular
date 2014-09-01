angular.module('ideaHat', ['ngAnimate', 'ngCookies',
    'ngTouch', 'ngSanitize',
    'ngResource', 'ui.router',
    'famous.angular', 'ideaHat.controllers', 
    'ideaHat.services', 'ideaHat.filters'])

// PRODUCTION
// .constant('FBURL', 'https://echo-bessolabs.firebaseio.com')
// .constant('SERVERURL', 'http://echo-rails.herokuapp.com')

// DEVELOPMENT
.constant('FBURL', 'https://ideaHat-dev.firebaseio.com')

.run(['$rootScope', 'FBURL', 'sessionService', function($rootScope, FBURL, sessionService){

  // establish authentication variable
  $rootScope.auth = sessionService.init('/login');
  
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    DBG.log("[stateTransition]        fromState:{"+fromState.name+", "+fromState.controller+"} toState:{"+toState.name+", "+toState.controller+"}");
    console.log('TO STATE OBJECT:', toState);
  });

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    DBG.log("[stateTransitionSuccess] fromState:{"+fromState.name+", "+fromState.controller+"} toState:{"+toState.name+", "+toState.controller+"}");
  });
}])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $stateProvider
	  .state('home',{
	  	url: '/',
	    controller: 'HomeCtrl',
	    templateUrl: 'components/home/home.index.html'
	  })

  $urlRouterProvider.otherwise('/login');
}]);