const _db = require('../../database/wrapper.js')

module.exports = async (data) => {
  let ret = _db.db.collections.posts.insertOne(data)
  return ret
}
