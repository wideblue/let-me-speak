'use strict';

angular.module('mojKomunikatorApp')
  .directive('ngdFocus', function($timeout) {
    return {
        link: function ( scope, element, attrs ) {
            scope.$watch( attrs.ngdFocus, function ( val ) {
                if ( angular.isDefined( val ) && val ) {
                    $timeout( function () { element[0].focus(); }, 410 );
                }
            }, true);

            element.bind('blur', function () {
                if ( angular.isDefined( attrs.ngdFocusLost ) ) {
                    scope.$apply( attrs.ngdFocusLost );

                }
            });

            element.bind('focus', function () {
                if ( angular.isDefined( attrs.ngdOnFocus ) ) {
                    scope.$apply( attrs.ngdOnFocus );

                }
            });
        }
    };
});