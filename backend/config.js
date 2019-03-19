const { settings } = require('../package.json')

let secrets

try {
  secrets = require('../secrets.json')
} catch (err) {
  console.info('using environment variables instead of secrets.json')
}

const PORT = process.env.PORT || settings.PORT
const PROTOCOL = process.env.NODE_ENV === 'production' ? 'https' : 'http'
const HOST_NAME = process.env.NODE_ENV === 'production' ? settings.heroku.HOST_NAME : 'localhost'
const HOST_AND_PROTOCOL = `${PROTOCOL}://${HOST_NAME}${process.env.NODE_ENV === 'production' ? '' : `:${PORT}`}`

const SESSION_SECRET = process.env.SESSION_SECRET || secrets.express.SESSION_SECRET
const CLIENT_ID = process.env.CLIENT_ID || secrets.google.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET || secrets.google.CLIENT_SECRET

module.exports = {
  PORT,
  PROTOCOL,
  HOST_NAME,
  HOST_AND_PROTOCOL,
  SESSION_SECRET,
  CLIENT_ID,
  CLIENT_SECRET
}
