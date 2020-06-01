'use strict';

angular.module('mojKomunikatorApp')
  .service('persistantStorage', function persistantStorage($rootScope, $q) {


   


  return {
    getwww: function(storageID) {
      console.log("berem localStorage");
      var deferred = $q.defer();
      $rootScope.favoritesList = JSON.parse(localStorage.getItem(storageID) || '[]')  ;
       deferred.resolve($rootScope.favoritesList);

     // return JSON.parse(localStorage.getItem(storageID) || '[]');
      return deferred.promise;
    },

    putwww: function(item , storageID ) {
      localStorage.setItem(storageID, JSON.stringify(item));
    },

    
  };
});