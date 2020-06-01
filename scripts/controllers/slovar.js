'use strict';

angular.module('mojKomunikatorApp')
  .controller('SlovarCtrl', function($scope , $rootScope, $routeParams, $http, audioManager, mobileNav, notification) {
 	
  	$scope.maxNumberItems = 5; //maximalno število delov stavka
  	$scope.maxNumberFavorites = 10; //maximalno število priljubljenih stavkov

  	if ($routeParams.stran=="stran") {
  		$scope.hideBackBtn=true;
  	} else {
  		$scope.hideBackBtn=false;
  	}

	function izvleciPodvnos(objektvnos, stringPoti ){    
		var arejPoti = stringPoti.split('_');
		var vmesniObjekt = objektvnos;
		for (var i = 1 ; i < arejPoti.length; i++) {
			vmesniObjekt=vmesniObjekt.vnos[arejPoti[i]]
			}
	  return    vmesniObjekt
	}

	var podvnos = {}; 
	
	// $http.get('slovar.json').success(function(data) {
		 // console.log("data");
         // console.log(data);
		
		
	// var slovarJSON = angular.copy(data);	
	
	 console.log("doSound");
     console.log($scope.doSound);
	  	  
	podvnos = izvleciPodvnos($scope.slovarJSON[1], $routeParams.stran);
    console.log("podvnos");
    console.log(podvnos);
   
   angular.forEach(podvnos.vnos , function(podpodvnos, key){
		if (podpodvnos.vnos.length > 0) {
			podpodvnos.hasChildren = true;
			podpodvnos.href = $routeParams.stran + "_"+key;
			console.log("podpodvnos.href ", podpodvnos.href);
			console.log(podpodvnos);
		} else {
			podpodvnos.hasChildren = false;
			podpodvnos.href = $routeParams.stran;
		}
   });
      
	
    $scope.vsebina = podvnos.vsebina;
    $scope.phones = podvnos.vnos;
	// });
	
	  // Called when capture operation is finished
    //
     var recordAudioBtn = document.getElementById("recordAudioBtn");
    function captureSuccess(mediaFiles) {
        // var i, len;
        // for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        //   console.log("Pot do posnetka je " + mediaFiles[i].fullPath);
          
        //   recordAudioBtn.value = mediaFiles[i].fullPath;
       // }       
    }

    // Called if something bad happens.
    // 
    function captureError(error) {
        // var msg = 'An error occurred during capture: ' + error.code;
        // navigator.notification.alert(msg, null, 'Uh oh!');
    }

    // A button will call this function
    //
    
    $scope.recordAudio = function(){
        // // Launch device audio recording application, 
        // // allowing user to capture up to 1 audio clips
        // navigator.device.capture.captureAudio(captureSuccess, captureError, {limit: 1 , mode:"audio/amr"  });
    }
	
	$scope.deliteList = function() {
		// $scope.itemsList.splice(0,$scope.itemsList.length); // empty whole list
		 $scope.itemsList.splice(-1,1); // remove last element
	}
	
	$scope.playList = function(listToPlay) {
		audioManager["playAudioList"+$scope.platformIndicator](listToPlay);		
	}
	
	$scope.iconClick = function(item) {
		//$scope.mainImageUrl = item.slika;	

		if ($scope.maxNumberItems>$scope.itemsList.length && item.zvok!="") {
			$scope.itemsList.push(item);
			// var partsRecordName = item.zvok.split('.');
			// if (partsRecordName[1]=="3gpp"){
			// 	playAudio(item.zvok);
			// } else {
			// playAudio("/android_asset/www/"+ item.zvok);		
			audioManager["playAudioList"+$scope.platformIndicator]([item]);	 
		}
		$scope.goToLocation('slovar/'+item.href, 'none');
	}

	$scope.toggleSound = function () {
		$scope.doSound= !$scope.doSound;
		$rootScope.doSound = $scope.doSound;
	}
	//add current itemsList to Favorits
	$scope.addToFavorites = function(item) {
		if ($scope.maxNumberFavorites > $scope.favoritesList.length && item.length > 0) {
			// notification["alert"+$rootScope.platformIndicator]("Dodano med priljubljene!", function () {	
			// }, 'Priljubljene', "V redu"); 
			notification["confirm"+$rootScope.platformIndicator]("Trenutni stavek bo dodan k priljubljenim.", function (button) {
				if (button==1) {
					var newfavoritItem = angular.copy(item);
					$scope.favoritesList.push(newfavoritItem);
					console.log("dodal nov item to favorites");
					console.log(item);	
				}
				
			}, 'Dodaj k priljubljenim.', ['Potrdi', 'Zavrni']);
		}
	}
	
	$scope.removeFavorit = function(item) {
		$scope.favoritesList.splice($scope.favoritesList.indexOf(item), 1);
	}

	$scope.goToLocation = function (location, type) {
		mobileNav.goToLocation(location, type);
	} 

	$scope.add = function (novVnos) {
	// var arejPoti = recordAudioBtn.value.split('/');
	// 	novVnos.zvok = arejPoti[arejPoti.length-1];
	// 	novVnos.slika = "";
	// 	novVnos.id	= "";
	// 	novVnos.datumvnosa = "";
	// 	novVnos.vnos	= [];
	
	// 	podvnos.vnos.push(angular.copy(novVnos));
	// 	shraniSlovarj();
	}

	$scope.doTheBack = function() {
	  mobileNav.doTheBack();
	};
 
	$scope.tabBarShow = true; 
	//$scope.showFavorites = false; 
	
	$scope.modalOpen = function (modalName) {
    $scope[modalName] = true;
    $scope.tabBarShow = false;
    $scope.setautofocus="autofocus";
  };

  	$scope.modalClose = function (modalName) {
    $scope[modalName] = false;
     $scope.tabBarShow = true; 
     $scope.setautofocus="" ;
   
  };

  $scope.opts = {
    backdropFade: true,
    dialogFade:true
  };


  $scope.hrefAdd = $routeParams.stran;
  $scope.orderProp = 'age';
	// File API
   function shraniSlovarj() {		
        // window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);		
    }

    function gotFS(fileSystem) {
        fileSystem.root.getFile("lokalniSlovar.txt", {create: true, exclusive: false}, gotFileEntry, fail);
    }

    function gotFileEntry(fileEntry) {
        fileEntry.createWriter(gotFileWriter, fail);
    }

    function gotFileWriter(writer) {
        writer.onwriteend = function(evt) {
            console.log("contents of file now $scope.slovarJSON()[0]");
            
        };
        writer.write(angular.fromJson($scope.slovarJSON()));
    }

    function fail(error) {
        console.log(error);
    }


//PhoneDetailCtrl.$inject = ['$scope', '$routeParams', '$http'];


});
