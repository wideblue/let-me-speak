!function(o){var t={};function e(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return o[r].call(n.exports,n,n.exports,e),n.l=!0,n.exports}e.m=o,e.c=t,e.d=function(o,t,r){e.o(o,t)||Object.defineProperty(o,t,{enumerable:!0,get:r})},e.r=function(o){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})},e.t=function(o,t){if(1&t&&(o=e(o)),8&t)return o;if(4&t&&"object"==typeof o&&o&&o.__esModule)return o;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:o}),2&t&&"string"!=typeof o)for(var n in o)e.d(r,n,function(t){return o[t]}.bind(null,n));return r},e.n=function(o){var t=o&&o.__esModule?function(){return o.default}:function(){return o};return e.d(t,"a",t),t},e.o=function(o,t){return Object.prototype.hasOwnProperty.call(o,t)},e.p="",e(e.s=0)}([function(o,t,e){"use strict";angular.module("mojKomunikatorApp",["Audio5","ajoslin.mobile-navigate","ngMobile"]).config((function(o){o.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/slovar/:stran",{templateUrl:"views/slovar.html",controller:"SlovarCtrl"}).when("/priljubljene",{templateUrl:"views/priljubljene.html",controller:"PriljubljeneCtrl"}).when("/osnovne",{templateUrl:"views/osnovne.html",controller:"OsnovneCtrl"}).when("/tipkovnica",{templateUrl:"views/tipkovnica.html",controller:"TipkovnicaCtrl"}).when("/prenos",{templateUrl:"views/prenos.html",controller:"PrenosCtrl"}).otherwise({redirectTo:"/"})})).run((function(o,t,e,r,n){o.platformIndicator="www",o.pathToFiles="slovar/",o.picturesDirectory="slike/",o.soundsDirectory="zvoki/",o.pathToPermanentStorage="",o.doAnimations=!1,o.doSound=!0,o.stopDownloading=!1,o.firstDownload=!1,o.itemsList=[],o.favoritesList=[];console.log("2DEVAJS READY"),e["get"+o.platformIndicator]("KomunikatorFavoritesList").then((function(t){console.log("read Data favorites"),console.log(t),o.favoritesList=angular.fromJson(t),o.$watch((function(){return o.favoritesList}),(function(){console.log("shranil bom favoritesList"),e["put"+o.platformIndicator](o.favoritesList,"KomunikatorFavoritesList")}),!0)}),(function(t){o.favoritesList=[],o.$watch((function(){return o.favoritesList}),(function(){console.log("shranil bom favoritesList"),e["put"+o.platformIndicator](o.favoritesList,"KomunikatorFavoritesList")}),!0)})),n({method:"GET",url:"slovar/slovar.json"}).success((function(t,e,n,i){console.log(" data Slovar"),console.log(t),o.slovarJSON=t,r.goToLocation("slovar/","none")})).error((function(o,t,e,r){alert("Prišlo je do napake pri pridobivanju slovarja. Predlagamo, da poskusite prenesti ponovno kasneje. ")}))}))}]);