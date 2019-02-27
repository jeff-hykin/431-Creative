const { settings } = require('./package.json')
const secrets = require('./secrets.json')
const chalk = require('chalk')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const _db = require('./database/wrapper')

const PORT = process.env.PORT || settings.PORT

app.use(require('cookie-parser')())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('express-session')({ secret: (process.env.SESSION_SECRET || secrets.express.SESSION_SECRET), resave: true, saveUninitialized: true }))

// Connect to DB
_db.connect()

// Setup GOOGLE AUTH
require('./backend/auth/index').setupGoogleAuth(app)

// Setup API endpoints for functions
require('./backend/setup-functions').setupBackendFunctions(app)

if (process.env.NODE_ENV === 'development') {
  const Bundler = require('parcel-bundler')
  const errorhandler = require('errorhandler')
  // Error handling depending on dev/prod mode
  app.use(errorhandler())

  const file = 'client/index.html' // Pass an absolute path to the entrypoint here
  const options = { // See options section of api docs, for the possibilities
    outDir: settings.PARCEL_OUT_DIR
  }

  // Initialize a new bundler using a file and options
  const bundler = new Bundler(file, options)

  // Let express use the bundler middleware, this will let Parcel handle every request over your express server
  app.use(bundler.middleware())
} else if (process.env.NODE_ENV === 'production') {
  const path = require('path')
  // use bundled static files
  app.use(express.static(settings.PARCEL_OUT_DIR))
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(`${settings.PARCEL_OUT_DIR}/index.html`))
  })
}

// Listen on port 8080
app.listen(PORT, () => { console.log(`\nApp is running on ${chalk.blue(`http://localhost:${PORT}`)} in ${chalk.red(process.env.NODE_ENV)} mode`) })
