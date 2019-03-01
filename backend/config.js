const { settings } = require('../package.json')

const PORT = process.env.PORT || settings.PORT
const PROTOCOL = process.env.NODE_ENV === 'production' ? 'https' : 'http'
const HOST_NAME = process.env.NODE_ENV === 'production' ? settings.heroku.HOST_NAME : 'localhost'
const HOST_AND_PROTOCOL = `${PROTOCOL}://${HOST_NAME}${process.env.NODE_ENV === 'production' ? '' : `:${PORT}`}`

module.exports = {
  PORT,
  PROTOCOL,
  HOST_NAME,
  HOST_AND_PROTOCOL
}
