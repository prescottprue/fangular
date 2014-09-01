angular.module('ideaHat.service.session', ['firebase', 'ideaHat.service.firebase'])

  .factory('sessionService', ['$rootScope', '$firebaseSimpleLogin', 'firebaseRef', '$q', '$timeout', 'providerProfileCreator',
    function($rootScope, $firebaseSimpleLogin, firebaseRef, $q, $timeout, providerProfileCreator) {
      var auth = null;
      return {
        init: function() {
          auth = $firebaseSimpleLogin(firebaseRef());
          console.log("[init] loginService.init", auth);
          return auth;
        },
        getCurrentUser: function () {
          return $getCurrentUser();
        },
        //3rd party provider login
        providerLogin: function(provider, callback){
          // console.warn('$ service.login.providerLogin('+provider+')');
          assertAuth();
          var scopeInfo = 'email';
          if(provider != 'google' && provider != 'facebook'){
            console.error('LOGIN_SERVICE: ' + provider + ' is an invaild provider.');
            forge.logging.error('LOGIN_SERVICE: ' + provider + ' is an invalid provider.');
          }
          auth.$login(provider, {
            rememberMe:true,
            scope:scopeInfo
          }).then(function(user){
            console.warn("[login] User authenticated: ", user);
            if(callback){
              if(provider == 'google')
                user.firstName = user.thirdPartyUserData.given_name;
              else
                user.firstName = user.thirdPartyUserData.first_name;
              $timeout(function(){
                callback(null, user);
              })
            }
          });
        },
        //email login
        login: function(email, pass, callback) {
          assertAuth();
          auth.$login('password', {
            email: email,
            password: pass,
            rememberMe: true
          }).then(function(user) {
              if( callback ) {
                //todo-bug https://github.com/firebase/angularFire/issues/199
                $timeout(function() {
                  callback(null, user);
                });
              }
            }, callback);
        },
        logout: function() {
          assertAuth();
          auth.$logout();
        },
        changePassword: function(opts) {
          assertAuth();
          var cb = opts.callback || function() {};
          if (!opts.oldpass || !opts.newpass) {
            $timeout(function(){ cb('Please enter a password'); });
          }
          else if (opts.newpass !== opts.confirm) {
            $timeout(function() { cb('Passwords do not match'); });
          }
          else {
            auth.$changePassword(opts.email, opts.oldpass, opts.newpass).then(function() { cb && cb(null) }, cb);
          }
        },
        createAccount: function(email, pass, callback) {
          assertAuth();
          auth.$createUser(email, pass).then(function(user) { callback && callback(null, user) }, callback);
        },
        setUserData: function() {
          console.warn('Called setUserData in loginService');
          return $rootScope.auth.user;
        },
        createProviderProfile: providerProfileCreator
      };
      function assertAuth() {
        if (auth === null) { 
          throw new Error('Must call loginService.init() before using its methods'); 
        }
      }
    }])

  .factory('providerProfileCreator', ['firebaseRef', '$timeout', function(firebaseRef, $timeout, $scope) {
    return function(userObj, userPhone, callback) {
      console.log('providerProfileCreator called');
      if (userObj.thirdPartyUserData.hasOwnProperty('phone')) {
        var userNumber = userObj.thirdPartyUserData.phone;
      } else {
        var userNumber = 'undefined';
      }

      if (userObj.thirdPartyUserData.hasOwnProperty('picture')) {
        var userPic = userObj.thirdPartyUserData.picture;
      } else {
        var userPic = 'undefined';
      }
      var accountProvider = userObj.provider.capitalize();
      var accountObj = {
        displayName: userObj.displayName,
        phone: userPhone,
        email: userObj.thirdPartyUserData.email,
        picture: userPic,
        provider: accountProvider,
        settings: {
          push:{
            // newEOW: true,
            // response: true,
            received: true,
            addedBy: true
          }
        }
      };
      console.log('before set is called');
      firebaseRef(['users', userObj.uid]).set(accountObj, function(err) {
        if (!err) {
          console.log('LOGIN_SERVICE: newUser in Firebase: ' + userObj.uid);
          firebaseRef('phoneNumbers/' + userPhone).set({uid:userObj.uid, displayName:userObj.displayName}, function(err){
            if (err) {
              console.error('error in push to accounts: ' + err);
            } else {
              console.log('push to accounts successful');
              callback(null);
            }
          });
        } else {
          //error in push of account information
          if (callback) {
            console.error('error in pushing new profile to users: ' + err);
            callback(err);
          }
        }
      });

    }
  }]);
