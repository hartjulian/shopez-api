const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userDb = require('../db/user');

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await userDb.getUserByUsername(username);
      if (!user) return done(null, false);
      
      const verified = await userDb.verifyPassword(user, password);
      if (!verified) return done(null, false);

      return done(null, user);
    } catch (err) {
      return done(err, false);
    };
  }
));

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});

