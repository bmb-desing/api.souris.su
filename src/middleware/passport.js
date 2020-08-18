const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();

let opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT;
passport.use(
  new JWTStrategy(opts, function (jwt_payload, done) {
    User.findOne({ email: jwt_payload.email }, function (err, user) {
      if (err) {
        done(err, false);
      }
      if (user) {
        user.password = undefined;
        done(null, user);
      } else {
        done(null, false);
      }
    });
  })
);

module.exports = passport;
