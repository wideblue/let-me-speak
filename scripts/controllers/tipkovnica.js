'use strict';

angular.module('mojKomunikatorApp')
  .controller('TipkovnicaCtrl', function($scope, mobileNav) {
   	$scope.doTheBack = function() {
   		$scope.showNavbar=true;
		mobileNav.doTheBack();
	};
	$scope.hideNavigationBar = function() {
		$scope.showNavbar=false;
	}
  });
