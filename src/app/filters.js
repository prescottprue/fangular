'use strict';

/* Filters */
angular.module('ideaHat.filters', [])

.filter('reverse', function() {
  function toArray(list) {
    var k, out = [];
    if( list ) {
      if( angular.isArray(list) ) {
        out = list;
      }
      else if( typeof(list) === 'object' ) {
        for (k in list) {
          if (list.hasOwnProperty(k)) {
            out.push(list[k]);
          }
        }
      }
    }
    return out;
  }
  return function(items) {
    return toArray(items).slice().reverse();
  };
})

.filter('orderObjectBy', function(){
  return function(input, attribute) {
    if (!angular.isObject(input)) return input;

    var array = [];
    for(var objectKey in input) {
      array.push(input[objectKey]);
    }

    function compare(a,b) {
      if (a[attribute] < b[attribute])
        return -1;
      if (a[attribute] > b[attribute])
        return 1;
      return 0;
    }

    array.sort(compare);
    return array;
  }
})

.filter('timeAgo', function() {
  return function(utc) {
    if (utc){
    var a = moment(utc).fromNow();
    return a;
    }
    else{
      return null;
    }
  };
})
.filter('capitalize', function(){
  return function(input, scope){
    if (input!=null)
      input = input.toLowerCase();
      return input.substring(0,1).toUpperCase()+input.substring(1);
  }
})
//Allows for no fitler, one filter or many
.filter('listFilter',[ function() {
   return function (list, selectedFilter) {
      if (!angular.isUndefined(list) && !angular.isUndefined(selectedFilter) && selectedFilter.length > 0) {
          var tempList = [];
          angular.forEach(selectedFilter, function (filter) {
              angular.forEach(list, function (item) {
                  if (angular.equals(item.status, filter)) {
                      tempList.push(item);
                  }
              });
          });
          return tempList;
      } else {
          return list;
      }
    };
}]);
