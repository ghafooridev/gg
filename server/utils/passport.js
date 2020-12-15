/* eslint-disable camelcase */

const JwtStrategy = require("passport-jwt").Strategy
const { ExtractJwt } = require("passport-jwt")
const User = require("../models/User")
const { secretOrKey } = require("../config")
const option = {}
option.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
option.secretOrKey = secretOrKey

module.exports = (passport) => {

  passport.use(
    new JwtStrategy(option, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) return done(null, user)
          return done(null, false)
        })
        .catch((err) => done(err, false))
    })
  )
}
