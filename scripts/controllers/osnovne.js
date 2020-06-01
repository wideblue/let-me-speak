'use strict';

angular.module('mojKomunikatorApp')
  .controller('OsnovneCtrl', function($scope, $rootScope, audioManager, mobileNav) {
  	
  	$scope.doTheBack = function() {
	  mobileNav.doTheBack();
	};

	$scope.playList = function(listToPlay) {
		audioManager["playAudioList"+$scope.platformIndicator](listToPlay);		
	}
  });
