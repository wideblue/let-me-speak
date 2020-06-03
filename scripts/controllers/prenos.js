'use strict';

angular.module('mojKomunikatorApp')
  .controller('PrenosCtrl',  function($scope, $rootScope, mobileNav) {
  	
	$scope.doTheBack = function() {
	mobileNav.doTheBack();
  };

});