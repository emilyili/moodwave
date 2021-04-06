const express = require('express');
const app = express();
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./passport');

var request = require('request');

var client_id = "93febf29f64649a8b1675c59304fa249";
var client_secret = "7ee44bfbd5ae44d5a9597ae3da9c4743";

var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

var image;
var audio;

request.post(authOptions, function (error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    var token = body.access_token;
    var options = {
      url: 'https://api.spotify.com/v1/search?q=PALACE%2CBROCKHAMPTOM&type=track%2Cartist&market=US&limit=1',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, function (error, response, body) {
      console.log(body.tracks.items);
      console.log(body.tracks.items[0].album.images[0].url); // image link
      console.log(body.tracks.items[0].preview_url); // audio preview
      image = body.tracks.items[0].album.images[0].url;
      audio = body.tracks.items[0].preview_url;
    });
  }
});


// const passport = require('passport');
// const SpotifyStrategy = require('passport-spotify').Strategy;

// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//   done(null, user);
// });

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