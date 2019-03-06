const db = require('../../database/wrapper.js')

module.exports = async (data) => {
  db.connect()
  let ret = db.collections.posts.insertOne(data)
  db.close()
  return ret
}
