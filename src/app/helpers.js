//Check for platform specific css, if none it is injected
if(typeof document.createStyleSheet === 'undefined') {
  document.createStyleSheet = (function() {
      function createStyleSheet(href) {
          if(typeof href !== 'undefined') {
              var element = document.createElement('link');
              element.type = 'text/css';
              element.rel = 'stylesheet';
              element.href = href;
          }
          else {
              var element = document.createElement('style');
              element.type = 'text/css';
          }
          document.getElementsByTagName('head')[0].appendChild(element);
          var sheet = document.styleSheets[document.styleSheets.length - 1];
          return sheet;
      }
      return createStyleSheet;
  })();
}
function DBG () {}
DBG.log = function(msg)   { DEBUG ? console.log(msg) : null; }
DBG.warn = function(msg)  { DEBUG ? console.warn(msg) : null; }
DBG.error = function(err) { DEBUG ? console.error(err) : null; }
DBG.ctrl = function(ctrl) { DBG.log('[init] '+ctrl+'Ctrl'); }
DBG.init = function(func) { DBG.log('[init] '+func); }
//Swipe controller
function ContentController($scope, $ionicSideMenuDelegate, $ionicSlideBoxDelegate) {
  //toggleSlide()
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.toggleRight = function() {
    $ionicSideMenuDelegate.toggleRight();
  };
  function toggleSlide(){
    if($ionicSideMenuDelegate.isOpen(true)){
      return $ionicSlideBoxDelegate.enableSlide(false);
    }
    else{
      return $ionicSlideBoxDelegate.enableSlide(true);
    }
  }
}
/**
 * Capitalize a string object.
 * @return {string} [capitalized string]
 */
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function isEmpty(object){
    if(_.size(object) >> 0){
      return false
    }
    return true
  }