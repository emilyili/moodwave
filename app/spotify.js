var request = require('request');
require('dotenv').config();

var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

var image;

function getImageAndAudio(song, artist, album) {
  // retrieve access token with client credentials 

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // use the access token to access the Spotify Web API
      var token = body.access_token;
      process.env.ACCESS_TOKEN = body.access_token;
      console.log(process.env.ACCESS_TOKEN);

      var options = {
        url: 'https://api.spotify.com/v1/search?q=PALACE%2CBROCKHAMPTOM&type=track%2Cartist&market=US&limit=1',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, function (error, response, body) {
        // console.log(body.tracks.items);
        // console.log(body.tracks.items[0].album.images[0].url); // image link
        // console.log(body.tracks.items[0].preview_url); // audio preview
        image = body.tracks.items[0].album.images[0].url;
        audio = body.tracks.items[0].preview_url;
        // console.log(image);
        // return image;
      });
    }
  });
}

console.log(image);

var object = getImageAndAudio('', '', '');
// console.log(object);

console.log(image);

// console.log(process.env.ACCESS_TOKEN);


// var SpotifyWebApi = require('spotify-web-api-node');

// // Create the api object with the credentials
// var spotifyApi = new SpotifyWebApi({
//   clientId: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET
// });

// // Retrieve an access token.
// spotifyApi.clientCredentialsGrant().then(
//   function (data) {
//     console.log('The access token expires in ' + data.body['expires_in']);
//     console.log('The access token is ' + data.body['access_token']);

//     // Save the access token so that it's used in future calls
//     spotifyApi.setAccessToken(data.body['access_token']);
//     process.env.ACCESS_TOKEN = data.body['access_token'];
//     spotifyApi.searchTracks('track:Peaches artist:Justin Bieber', { limit: 1 })
//       .then(function (data) {
//         //console.log('Search tracks by "Alright" in the track name and "Kendrick Lamar" in the artist name', data.body);
//         console.log(data.body['tracks']);
//         console.log(data.body['tracks'].items[0].album.images[0].url);
//         console.log(data.body['tracks'].items[0].preview_url);
//       }, function (err) {
//         console.log('Something went wrong!', err);
//       });
//   },
//   function (err) {
//     console.log('Something went wrong when retrieving an access token', err);
//   }
// );

// console.log(spotifyApi);
// console.log(process.env.ACCESS_TOKEN);

// spotifyApi.searchTracks('track:Peaches artist:Justin Bieber', { limit: 1 })
//   .then(function (data) {
//     //console.log('Search tracks by "Alright" in the track name and "Kendrick Lamar" in the artist name', data.body);
//     console.log(data.body['tracks']);
//     console.log(data.body['tracks'].items[0].album.images[0].url);
//     console.log(data.body['tracks'].items[0].preview_url);
//   }, function (err) {
//     console.log('Something went wrong!', err);
//   });





// passport.use(new SpotifyStrategy({
//   clientID: "93febf29f64649a8b1675c59304fa249",
//   clientSecret: "7ee44bfbd5ae44d5a9597ae3da9c4743",
//   callbackURL: "http://localhost:8888/auth/spotify/callback"
// },
//   function (accessToken, refreshToken, profile, done) {
//     return done(null, profile);
//   }
// ));

// var port = 8888;
// var authCallbackPath = '/auth/spotify/callback';

// app.get('/', (req, res) => {
//   res.send('Hello world');
// });
// app.use(passport.initialize());
// app.use(passport.session());

// app.get('/', (req, res) => {
//   res.send(`Hello world ${req.user.displayName}`)
// })

// app.get('/auth/error', (req, res) => res.send('Unknown Error'))
// app.get('/auth/spotify', passport.authenticate('spotify'));

// app.get('/auth/spotify/callback', passport.authenticate('spotify', { failureRedirect: '/auth/error' }),
//   function (req, res) {
//     res.redirect('/');
//   });

// app.listen(8888, () => {
//   console.log('Serve is up and running at the port 8888');
// });