'use strict';

angular.module('mojKomunikatorApp')
  .controller('PriljubljeneCtrl', function( $scope, $rootScope, audioManager, mobileNav, notification) {
    $scope.edit=false;
    $scope.changeEdit = function() {
    	 $scope.edit= !$scope.edit;
    }

   	$scope.doTheBack = function() {
	  mobileNav.doTheBack();
	};

	$scope.removeFavorit = function(item) {
		notification["confirm"+$rootScope.platformIndicator]("Potrdi izbris", function (button) {
			if (button==1) {
				$scope.favoritesList.splice($scope.favoritesList.indexOf(item), 1);
			}
			
		}, 'Izbris', ['Potrdi', 'Zavrni']);
	}

	$scope.playList = function(listToPlay) {
		if (!$scope.edit) {
			audioManager["playAudioList"+$scope.platformIndicator](listToPlay);	
		}	
	}

  });
