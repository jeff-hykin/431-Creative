const uuidv4 = require('uuid/v4')
const _db = require('../database/wrapper')

async function createUser (email, firstName = '', lastName = '', role = '') {
  let date = new Date()
  let user = {
    _id: uuidv4(),
    email,
    firstName,
    lastName,
    dateCreated: date,
    dateModified: date,
    myPosts: [], // list of post Ids
    fields: [], // list of objects representing fields
    role
  }
  await _db.db.collections.users.insertOne(user)
}

module.exports = {
  createUser
}
