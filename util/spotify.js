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
      setTimeout(() => { console.log(obj); }, 3);
      spotifyApi.searchTracks('track:' + obj.name + ' artist:' + obj.artist, { limit: 1 })
        .then(function (data) {
          let object = {
            name: obj.name,
            singer: obj.artist,
            image: data.body['tracks'].items[0].album.images[0].url,
            audio: data.body['tracks'].items[0].preview_url
          };
          //console.log(data.body['tracks'].items[0]);
          writeToJSON(object, 'util/spotify.json');
        }, function (err) {
          //console.log('Something went wrong!', err);
          writeToJSON(obj, MISSING_FILE);
        });
    },
    function (err) {
      console.log('Something went wrong when retrieving an access token', err);
      writeToJSON(obj, MISSING_FILE);
    }
  );
}

var f = fs.readFileSync('util/spotify.json');
var allSongs = JSON.parse(f);
// const allData = require('../app/data.js');
// console.log(allData);

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
          
          getImageAndAudio(songObj);
        }
      }
    }
  }
}

// const a = require('../app/data.js');

// var missing = { 
//   'wjung98': a.wjung98, 
//   'carafo_': a.carafo_, 
//   'tieszofant': a.tieszofant, 
//   'oblvr8': a.oblvr8};

// getUniqueSongs(missing);

const READ_FILE = 'util/missing2.json';
const MISSING_FILE = 'util/missing.json';

function retrieveMissing() {
  var f = fs.readFileSync(READ_FILE);
  var missing = JSON.parse(f);
  for (const item in missing) {
    setTimeout(() => { console.log(missing[item]); }, 3);
      getImageAndAudio(missing[item]);
  }

}

retrieveMissing();


// var dataset = fs.readFileSync('util/missing2.json');
// var updatedDataset = JSON.parse(dataset);
// console.log(updatedDataset.length);


// getImageAndAudio("Peaches", "Justin Bieber");
// getImageAndAudio("Confirmation", "Justin Bieber");