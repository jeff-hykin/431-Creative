const _db = require('../../database/wrapper.js')

module.exports = async (user, data) => {
  return _db.db.collections.posts.insertOne(data)
}
