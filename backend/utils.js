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
    role
  }
  let result = await _db.db.collections.users.insertOne(user)
  return result
}

async function createPost (ownerId, title, description, contactInfo, skills) {
  let date = new Date()
  let id = uuidv4()
  let post = {
    _id: id,
    ownerId,
    title,
    description,
    contactInfo,
    dateCreated: date,
    dateModified: date,
    skills
  }

  // Add post
  let result = await _db.db.collections.posts.insertOne(post)

  // Update User to have post id
  await _db.db.collections.users.updateOne({ _id: ownerId }, { $push: { myPosts: id } })

  return result
}

async function deletePost (postId) {
  // Remove id from user
  await _db.db.collections.users.updateOne({ myPosts: { $in: [postId] } }, { $pull: { myPosts: postId } })

  // Delete post
  return _db.db.collections.posts.deleteOne({ _id: postId })
}

module.exports = {
  createUser,
  createPost,
  deletePost
}
