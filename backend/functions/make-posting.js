const _db = require('../../database/wrapper.js')

module.exports = async (data) => {
  let ret = await _db.db.collections.posts.insertOne(data).catch((e) => { console.error(e) })
  return ret
}
