const passport = require('passport')
let GoogleStrategy = require('passport-google-oauth20').Strategy
const { HOST_AND_PROTOCOL, CLIENT_ID, CLIENT_SECRET } = require('../config')

const _db = require('../../database/wrapper')
const { createUser } = require('../utils')

/* Passport Config */
passport.use(new GoogleStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: `${HOST_AND_PROTOCOL}/auth/google/callback`,
  // This option tells the strategy to use the userinfo endpoint instead
  userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
}, async (accessToken, refreshToken, profile, cb) => {
  process.nextTick(async () => {
    try {
      let user = await _db.db.collections.users.findOne({ email: profile['emails'][0].value })
      // Create user if not found.
      if (!user) {
        user = (await createUser(profile['emails'][0].value, profile['name']['givenName'], profile['name']['familyName'])).ops[0]
      }
      cb(null, user)
    } catch (err) {
      cb(err)
    }
  })
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

function setupGoogleAuth (app) {
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

  app.get('/auth/google/authenticate', (req, res) => {
    if (req.user) {
      res.json({ authenticated: true, user: req.user })
    } else {
      res.json({ authenticated: false })
    }
  })

  app.get('/auth/google/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })
}

module.exports = {
  setupGoogleAuth,
  passport
}
