const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(new SpotifyStrategy({
  clientID: "93febf29f64649a8b1675c59304fa249",
  clientSecret: "7ee44bfbd5ae44d5a9597ae3da9c4743",
  callbackURL: "http://localhost:8888/auth/spotify/callback"
},
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));