// SPOTIFY CLIENT CREDENTIALS AUTHORIZATION
// require('dotenv').config();
// var request = require('request');

//console.log(process.env.CLIENT_ID);

// var authOptions = {
//   url: 'https://accounts.spotify.com/api/token',
//   type: 'POST',
//   headers: {
//     'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
//   },
//   form: {
//     grant_type: 'client_credentials'
//   },
//   json: true
// };

$(document).ready(function () {
  alert("Hello World!");
  // $.ajax({ authOptions },
  //   success: function (data) {
  //     // Once I get the user info, set up the template and run everything
  //     console.log(data);
  //   });
  var para = document.createElement("P");               // Create a <p> element
  para.innerText = "This is a paragraph";               // Insert text
  document.body.appendChild(para);
  var ele = document.createElement("span");
  var img = document.createElement("img");

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
  // // $.ajax({
  // //   url: "https://accounts.spotify.com/api/token",
  // //   type: "POST",
  // //   beforeSend: function (xhr) {
  // //     xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
  // //   },
  // success: function (data) {
  //   // Once I get the user info, set up the template and run everything
  //   document.body.innerHTML = Handlebars.templates.main({ name: data.display_name });

  //   // startApp is everything
  //   startApp();
  // }
  // });
});


// spotifyApi.searchTracks('track:Peaches artist:Justin Bieber', { limit: 1 })
//   .then(function (data) {
//     //console.log('Search tracks by "Alright" in the track name and "Kendrick Lamar" in the artist name', data.body);
//     console.log(data.body['tracks']);
//     console.log(data.body['tracks'].items[0].album.images[0].url);
//     console.log(data.body['tracks'].items[0].preview_url);
//   }, function (err) {
//     console.log('Something went wrong!', err);
//   });



// var authOptions = {
//   url: 'https://accounts.spotify.com/api/token',
//   headers: {
//     'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//   },
//   form: {
//     grant_type: 'client_credentials'
//   },
//   json: true
// };

// var image;
// var audio;

// request.post(authOptions, function (error, response, body) {
//   if (!error && response.statusCode === 200) {

//     // use the access token to access the Spotify Web API
//     var token = body.access_token;
//     var options = {
//       url: 'https://api.spotify.com/v1/search?q=PALACE%2CBROCKHAMPTOM&type=track%2Cartist&market=US&limit=1',
//       headers: {
//         'Authorization': 'Bearer ' + token
//       },
//       json: true
//     };
//     request.get(options, function (error, response, body) {
//       console.log(body.tracks.items);
//       console.log(body.tracks.items[0].album.images[0].url); // image link
//       console.log(body.tracks.items[0].preview_url); // audio preview
//       image = body.tracks.items[0].album.images[0].url;
//       audio = body.tracks.items[0].preview_url;
//     });
//   }
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