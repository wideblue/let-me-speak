'use strict';

angular.module('mojKomunikatorApp')
  .controller('MainCtrl', function ($scope, mobileNav ) {
    $scope.goToLocation = function (location, type) {
		mobileNav.goToLocation(location, type);
	} 
  });
