const db = require('../../database/wrapper.js')

module.exports = async (data) => {
  db.connect()
  let ret = db.db.collections.posts.insertOne(data)
  db.close()
  return ret
  // return db.insertOnePost(data)
}

// example frontend usage:
// import { api } from '../../backend/setup-functions'

// (async () => {
//   try {
//     console.log(`api['dummy-function'] is:`, await api['dummy-function']())
//   } catch (e) {
//     console.log(`e is:`, e)
//   }
// })()
