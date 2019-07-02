const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const opts = {
  jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey = 'secret'
}

module.exports = passport => {
  passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    await User.findOne({ id: jwt_payload.sub }, function (err, user) {
      if (err) {
        return done(err, false)
      }
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    })
  }))
}
