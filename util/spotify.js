var fs = require('fs');
require('dotenv').config();

var SpotifyWebApi = require('spotify-web-api-node');

// Create the api object with the credentials
var spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

function writeToJSON(obj, file) {
  var dataset = fs.readFileSync(file);
  var updatedDataset = JSON.parse(dataset);
  updatedDataset.push(obj);
  fs.writeFileSync(file, JSON.stringify(updatedDataset));
}

// Connect to Spotify API to retrieve image and audio URLs 
function getImageAndAudio(obj) {
  // Retrieve an access token.
  spotifyApi.clientCredentialsGrant().then(
    function (data) {
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
      process.env.ACCESS_TOKEN = data.body['access_token'];
      spotifyApi.searchTracks('track:' + obj.name + ' artist:' + obj.artist, { limit: 1 })
        .then(function (data) {
          let object = {
            name: obj.name,
            singer: obj.artist,
            image: data.body['tracks'].items[0].album.images[0].url,
            audio: data.body['tracks'].items[0].preview_url
          };
          // console.log(object);
          writeToJSON(object, 'util/spotify.json');
        }, function (err) {
          //console.log('Something went wrong!', err);
          writeToJSON(obj, 'util/missing.json');
        });
    },
    function (err) {
      console.log('Something went wrong when retrieving an access token', err);
      writeToJSON(obj, 'util/missing.json');
    }
  );
}

var allSongs = [];
const allData = require('../app/data.js');

// retrieve list of all songs played by users 
function getUniqueSongs(dataset) {
  for (const user in dataset) {
    userData = dataset[user];
    for (const day in userData) {
      topsongs = userData[day].topsongs;
      if (topsongs[0]) {
        let songObj = {
          name: topsongs[0].name,
          artist: topsongs[0].singer
        }
        let exist = allSongs.some(item => item.name === songObj.name && item.artist === songObj.artist);
        if (!exist) {
          allSongs.push(songObj);
          getImageAndAudio(songObj);
        }
      }

      // for (var i = 0; i < 5; i++) {
      //   if (topsongs[i]) {
      //     let songObj = {
      //       name: topsongs[i].name,
      //       artist: topsongs[i].singer
      //     }
      //     let exist = allSongs.some(item => item.name === songObj.name && item.artist === songObj.artist);
      //     if (!exist) {
      //       allSongs.push(songObj);
      //       getImageAndAudio(songObj);
      //     }
      //   }
      // }
    }
  }
}

// getUniqueSongs(allData);

// while missing.json still has items, then continue to loop through and 




// getImageAndAudio("Peaches", "Justin Bieber");
// getImageAndAudio("Confirmation", "Justin Bieber");