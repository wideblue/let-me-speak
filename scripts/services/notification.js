/*
 * angular-phonegap-notification v0.0.1
 * (c) 2013 Brian Ford http://briantford.com
 * License: MIT
 */
'use strict';

angular.module('mojKomunikatorApp')
  .service('notification', function notification($rootScope) {
    return {
      alertCordova: function (message, alertCallback, title, buttonName) {
        navigator.notification.alert(message, function () {
          var that = this,
            args = arguments;
          
          $rootScope.$apply(function () {
            alertCallback.apply(that, args);
          });
        }, title, buttonName);
      },
      confirmCordova: function (message, confirmCallback, title, buttonLabels) {
        navigator.notification.confirm(message, function () {
          var that = this,
            args = arguments;
          
          $rootScope.$apply(function () {
            confirmCallback.apply(that, args);
          });
        }, title, buttonLabels);
      },
      alertwww: function (message, alertCallback, title, buttonName) {
        alert(message);
      },
      confirmwww: function (message, confirmCallback, title, buttonLabels) {
        var confirmed = confirm(message);
        if (confirmed) {
          var that = this,
            //args = arguments;
            args=[1];
          
          // $rootScope.$apply(function () {
            confirmCallback.apply(that, args);
          // });
    	}
      }	
    };
  });