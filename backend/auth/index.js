const passport = require('passport')
let GoogleStrategy = require('passport-google-oauth20').Strategy
const os = require('os')
const { settings } = require('../../package.json')
const { google } = require('../../secrets.json')

const _db = require('../../database/wrapper')
const { createUser } = require('../utils')

const PORT = process.env.PORT || settings.PORT
const CLIENT_ID = process.env.CLIENT_ID || google.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET || google.CLIENT_SECRET

// Callback Info
const PROTOCOL = process.env.NODE_ENV === 'production' ? 'https' : 'http'
const HOST_NAME = process.env.NODE_ENV === 'production' ? settings.heroku.HOST_NAME : 'localhost'
const CALLBACK_BASE = `${PROTOCOL}://${HOST_NAME}${process.env.NODE_ENV === 'production' ? '' : `:${PORT}`}`

/* Passport Config */
passport.use(new GoogleStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: `${CALLBACK_BASE}/auth/google/callback`
}, async (accessToken, refreshToken, profile, cb) => {
  try {
      let user = await _db.db.collections.users.findOne({ email: profile['emails'][0].value })
      // Create user if not found.
      if(!user) {
          await createUser(profile['emails'][0].value, profile['name']['givenName'], profile['name']['familyName'])
      }
      cb(null, user)
  } catch (err) {
      cb(err)
  }
}))

passport.serializeUser((user, cb) => {
  cb(null, user._id)
})

passport.deserializeUser((_id, cb) => {
  _db.db.collections.users.findOne({ _id }).then(user => {
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
  app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

  app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
      // On success
      res.redirect('/')
  })
}

module.exports = {
  passport
}