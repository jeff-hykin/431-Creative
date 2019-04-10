const { createPost } = require('../utils')
const _db = require('../../database/wrapper')

module.exports = async (user, data, postId) => {
  let post = await _db.db.collections.posts.findOne({ _id: postId }, { ownerId: 1 })
  if (!user || (postId != null && user._id !== post.ownerId && user.role !== 'admin')) throw Error('not authorized')
  if (!data.title || !data.description || !data.contactInfo || !data.skills) throw Error('missing post parameters')
  return createPost(user._id, data.title, data.description, data.contactInfo, data.skills, postId)
}
