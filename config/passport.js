const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = require('../api/models/User');
const keys = require('./keys');

const opts ={
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.PASSPORT_KEY
};

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id, (err,data) => {
        if(data){
          return done(null, data)
        } return done(err)
      });
    })
  );
}
