const db = require('./db/api');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Passport needs to serialize and deserialize user instances
// from a session store to support login sessions
module.exports = (passport) => {

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      // Query the database to find user record associated with this
      // google profile, then pass that object to done callback
      db.findUserById(profile.id).then((id) => {
        if (id) {
          return done(null, profile);
        } else {
          db.createUser(profile.id).then((id) => {
            return done(null, profile);
          });
        }
      });
    }
  ));

}
