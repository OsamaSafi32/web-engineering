const User = require('../models/User');

module.exports = function configurePassport(passport) {
  passport.use(User.createStrategy());
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
};
