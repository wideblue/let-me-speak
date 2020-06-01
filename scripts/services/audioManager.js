'use strict';

angular.module('mojKomunikatorApp')
  .service('audioManager', function audioManager($rootScope, AudioService) {
  // Service logic
  // ...




function audioServicePlay(list) {
   console.log("audioServicePlay started");
   if (!$rootScope.doSound) {
    return;
   }

   function playAudio(playlistId) {
      var player = AudioService;
     console.log("audioPlay started");
     var audio = [];
      audio.playlist = list;
     if(playlistId < audio.playlist.length){
      player.load( $rootScope.pathToFiles+$rootScope.soundsDirectory + audio.playlist[playlistId].zvok);
      player.play();
      player.on('ended',function(){
         console.log("Play ended");
        //$rootScope.$apply();
        playlistId ++;
        // playAudio(playlistId);
        if(playlistId < audio.playlist.length){
          player.load( $rootScope.pathToFiles+$rootScope.soundsDirectory + audio.playlist[playlistId].zvok);
          player.play();
          //$rootScope.$apply();
        }
      });
     }  
   }
   playAudio(0);
}


 function playAudioList(list) {

    if (!$rootScope.doSound) {
    return;
    }
      	var audio = [];
		// Array of files you'd like played
		audio.playlist = list;
		 
		function playAudio(playlistId) {
		    // Default playlistId to 0 if not supplied 
		  //  playlistId = playlistId ? playlistId : 0;
		    if(playlistId < audio.playlist.length){
			    var firstMedia = new  Audio5js({
			      swf_path: 'bower_components/audio5/audio5js.swf',
			      throw_errors: true,
			      format_time: true,
			      ready: function (player) {
			        //this points to the audio5js instance
			        this.load( $rootScope.pathToFiles + $rootScope.soundsDirectory+  audio.playlist[playlistId].zvok);
			        this.play();
			        console.log("začel  zvokom");
			        console.log($rootScope.pathToFiles + $rootScope.soundsDirectory+ audio.playlist[playlistId].zvok);
			        //will output {engine:'html', codec: 'mp3'} in browsers that support MP3 playback.
			        // will output {engine:'flash', codec: 'mp3'} otherwise	        
			        console.log(player);
			        this.on('ended', function(){
			                playlistId ++;
                      //playAudio(playlistId);
                      if(playlistId < audio.playlist.length){                
                      this.load($rootScope.pathToFiles + $rootScope.soundsDirectory + audio.playlist[playlistId].zvok);
                      this.play();
                    }
			            }, this);
			      }
			    });
		 	}  
		}
		 
		// Start
		playAudio(0);
      
      }

       var nextMedia = null;
      var firstMedia = null;
      
      

        // onError Callback 
        //
        function onError(error) {
          
            alert('code: '    + error.code    + '\n' + 
                  'message: ' + error.message + '\n');
        }

 

  // Public API here
  return {
   playAudioListwww: playAudioList,

   
  };
});
