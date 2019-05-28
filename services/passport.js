const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const passport = require('passport');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
  .then(user => {
    done(null, user);
  })
});

passport.use(new FacebookStrategy({
  clientID: keys.facebookID,
  clientSecret: keys.facebookSecretCode,
  callbackURL: '/auth/facebook/callback',
  }, 
(accessToken, refreshToken, profile, done) => {
    User.findOne({facebookID: profile.id})
    .then(existingUser => {
      if(existingUser) {
        done(null, existingUser);
      } else {
        new User({facebookID: profile.id})
        .save()
        .then(user => done(null, user))
      }
    })
  })
);