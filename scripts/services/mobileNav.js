'use strict';

angular.module('mojKomunikatorApp')
  .service('mobileNav', function mobileNav($navigate, $rootScope, $location) {
    return {
        goToLocation: function (path,type) {
        	if ($rootScope.doAnimations) {
            	$navigate.go('/' + path,type);
        	} else {
        		$location.path(path);

        	}
        },
        doTheBack: function () {
        	if ($rootScope.doAnimations) {
            	$navigate.back();
            } else {
            	window.history.back();
        	}	
        },
        getLocation: function() {
            return $location.path();
        }
    }
});
