const uuidv4 = require('uuid/v4')
const _db = require('../database/wrapper')

async function createUser(email, firstName='', lastName='') {
  let currentTime = Date.now()
  user = {
    _id: uuidv4(),
    email,
    firstName,
    lastName,
    dateCreated: currentTime,
    dateModified: currentTime,
    myPosts: [], // list of post Ids
    fields: [], // list of objects representing fields
    // TODO: add role
  }
  await _db.db.collections.users.insertOne(user)
}

module.exports = {
  createUser
}