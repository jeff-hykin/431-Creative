const { settings } = require('./package.json')
const express = require('express')
const app = express()

// let dualEnd = require('./backend/setup-functions')
// dualEnd.setupBackendFunctions()

if (process.env.NODE_ENV === 'development') {
  const Bundler = require('parcel-bundler')
  const errorhandler = require('errorhandler')
  // Error handling depending on dev/prod mode
  app.use(errorhandler())

  const file = 'client/index.html' // Pass an absolute path to the entrypoint here
  const options = {} // See options section of api docs, for the possibilities

  // Initialize a new bundler using a file and options
  const bundler = new Bundler(file, options)

  // Let express use the bundler middleware, this will let Parcel handle every request over your express server
  app.use(bundler.middleware())
} else if (process.env.NODE_ENV === 'production') {
  const path = require('path')
  // use bundled static files
  app.use(express.static('dist'))
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve('./dist/index.html'))
  })
}

// Listen on port 8080
app.listen(settings.PORT, () => { console.log(`\nApp is running on http://localhost:${settings.PORT} in ${process.env.NODE_ENV} mode`) })
