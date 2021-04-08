var fs = require('fs');
require('dotenv').config();

var SpotifyWebApi = require('spotify-web-api-node');

// Create the api object with the credentials
var spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

function writeToJSON(obj) {
  var dataset = fs.readFileSync('util/spotify.json');
  var updatedDataset = JSON.parse(dataset);
  updatedDataset.push(obj);
  fs.writeFileSync('util/spotify.json', JSON.stringify(updatedDataset));
}

// Connect to Spotify API to retrieve image and audio URLs 
function getImageAndAudio(song, artist) {
  // Retrieve an access token.
  spotifyApi.clientCredentialsGrant().then(
    function (data) {
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
      process.env.ACCESS_TOKEN = data.body['access_token'];
      spotifyApi.searchTracks('track:' + song + ' artist:' + artist, { limit: 1 })
        .then(function (data) {
          let object = {
            name: song,
            singer: artist,
            image: data.body['tracks'].items[0].album.images[0].url,
            audio: data.body['tracks'].items[0].preview_url
          };
          console.log(object);
          writeToJSON(object);
        }, function (err) {
          console.log('Something went wrong!', err);
        });
    },
    function (err) {
      console.log('Something went wrong when retrieving an access token', err);
    }
  );
}

getImageAndAudio("Peaches", "Justin Bieber");
getImageAndAudio("Confirmation", "Justin Bieber");