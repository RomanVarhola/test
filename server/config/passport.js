const passport = require('passport');
const sha256 = require('sha256');
const LocalStrategy = require('passport-local').Strategy;
const userService = require('../services/user.service');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userService.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const hashPassword = sha256(password);
    const user = await userService.findByEmailAndPassword(email, hashPassword);
    if (!user) {
      return done(null, false, {errors: ['email or password is invalid']});
    }
    return done(null, user);
  } catch (err) {
    throw done(err, false);
  }
}));
