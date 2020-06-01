'use strict';

var mojKomunikatorApp = angular.module('mojKomunikatorApp', ['Audio5', 'ajoslin.mobile-navigate', 'ngMobile'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/slovar/:stran', {
        templateUrl: 'views/slovar.html',
        controller: 'SlovarCtrl'
      })
      .when('/priljubljene', {
        templateUrl: 'views/priljubljene.html',
        controller: 'PriljubljeneCtrl'
      })
      .when('/osnovne', {
        templateUrl: 'views/osnovne.html',
        controller: 'OsnovneCtrl'
      })
      .when('/tipkovnica', {
        templateUrl: 'views/tipkovnica.html',
        controller: 'TipkovnicaCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  mojKomunikatorApp.run(function($rootScope, $q,  persistantStorage, mobileNav, $http) {

  //string indicating  chosen platform   "www", "Cordova"
  $rootScope.platformIndicator = "www";
  $rootScope.pathToFiles = "slovar/";
  $rootScope.picturesDirectory = "slike/"//ime dirktorija s slikami. Pot do slike je pathToFiles+picturesDirectory+"ime slike, ki je zapisano v  slovarJSON"
  $rootScope.soundsDirectory = "zvoki/" //ime dirktorija z zvoki
  $rootScope.pathToPermanentStorage = "";
  $rootScope.doAnimations = false; // če želiš izključit animacije zamenjaj tudi <mobile-view> z <ng-view>
  $rootScope.doSound = true;
  $rootScope.stopDownloading = false;
  $rootScope.firstDownload = false;
  $rootScope.itemsList = [];
  $rootScope.favoritesList = [];
  var urlSlovarja = 'slovar/slovar.json';

 
 // function getSlovar(slovarUrl, $http ) {
    // $http.get(slovarUrl).success(function(data) {
      // slovarJSON = angular.copy(data);
    // });
  // }

  //var slovarJSON = angular.copy(slovar);
  // getSlovar('slovar.json');
  // getSlovar.$inject = ['$scope', '$http'];
  var PERSISTANT_STORAGE_FAVORITES_LIST_ID = 'KomunikatorFavoritesList';
      
 
  // cordovaReady(function( ) {
    // document.addEventListener("deviceready", onDeviceReady, false);

  //  //document.addEventListener('deviceready', 
     // function onDeviceReady() {
    console.log("2DEVAJS READY")
    // Tukaj poskušam pridobiti priljublje stavke iz  persistantStorage
  persistantStorage["get"+$rootScope.platformIndicator](PERSISTANT_STORAGE_FAVORITES_LIST_ID).then(function(data) {
    console.log("read Data favorites");
    console.log(data);

    $rootScope.favoritesList = angular.fromJson(data);
    //$rootScope.favoritesList = JSON.parse(data);
     // alert("promis resolved");

     $rootScope.$watch(function() { return $rootScope.favoritesList; }, function() {
                console.log("shranil bom favoritesList");  
                 persistantStorage["put"+$rootScope.platformIndicator]($rootScope.favoritesList,PERSISTANT_STORAGE_FAVORITES_LIST_ID);  
              }, true);
    },
   function(reason){
     // alert("promis rejected"); 
     $rootScope.favoritesList = []; 
     $rootScope.$watch(function() { return $rootScope.favoritesList; }, function() {
                console.log("shranil bom favoritesList");  
                 persistantStorage["put"+$rootScope.platformIndicator]($rootScope.favoritesList, PERSISTANT_STORAGE_FAVORITES_LIST_ID);  
              }, true);

    });

  $http({method: 'GET', url: urlSlovarja})
      .success(function(data, status, headers, config) {
        console.log(" data Slovar");
        console.log(data);
        $rootScope.slovarJSON = data; // slovar se naloži v komunikator
        mobileNav.goToLocation('slovar/', 'none'); //preusmerim na prvo stran slovarja 

      })
      .error(function(data, status, headers, config) {
        alert("Prišlo je do napake pri pridobivanju slovarja. Predlagamo, da poskusite prenesti ponovno kasneje. ");
       
        
    });



    //|| [];
  //if favoritesList changed we write it in the persistant storage. In the case of Cordova platform
  // I attache $watch after $rootScope.favoritesList was read from storage. This part of the code is inside 
  // callback readAsText in persistanStorage 
 // if ($rootScope.platformIndicator == "www"){
 //  $rootScope.$watch(function() { return $rootScope.favoritesList; }, function() {
 //                     console.log("favorites so se spremenili klic persistan storage");
 //     persistantStorage["put"+$rootScope.platformIndicator]($rootScope.favoritesList, "lokalniSlovar.txt");
 //  }, true);
 // //}

  

  //$rootScope.favoritesList = [];
 
  // $rootScope.slovarJSON = slovar3; 
  // function () { 
    
  //   return  slovar3;       //slovarJSON ;
  // }
});
