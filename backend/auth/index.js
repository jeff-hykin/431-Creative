const passport = require('passport')
let GoogleStrategy = require('passport-google-oauth20').Strategy
const os = require('os')
const { settings } = require('../../package.json')
const { google } = require('../../secrets.json')

const _db = require('../../database/wrapper')

const PORT = process.env.PORT || settings.PORT
const CLIENT_ID = process.env.CLIENT_ID || google.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET || google.CLIENT_SECRET

/* Passport Config */
passport.use(new GoogleStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: `http://${os.hostname()}:${PORT}/auth/google/callback` // FIXME: Make the hostname for prod be the heroku app name. Add it to package.json. Also remove port
}, async (accessToken, refreshToken, email, cb) => {
  try {
      let user = await _db.db.collections.users.findOne({ email: email['emails'][0].value })
      if(!user) {
          user = {
              email: email['emails'][0].value
          }
          await _db.db.collections.users.insertOne(user)
      }
      cb(null, user)
  } catch (err) {
      cb(err)
  }
}))

passport.serializeUser((user, cb) => {
  cb(null, user.email)
})

passport.deserializeUser((email, cb) => {
  _db.db.collections.users.findOne({ email }).then(user => {
    cb(null, user)
  }).catch(err => {
    cb(err)
  })
})

module.exports.setupGoogleAuth = (app) => {
  // Initialize Passport and restore authentication state, if any, from the
  // session.
  app.use(passport.initialize())
  app.use(passport.session())

  /* Routes */
  app.get('/auth/google', passport.authenticate('google', { scope: ['email'] }))

  app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
      // On success
      res.redirect('/')
  })
}

module.exports = {
  passport
}