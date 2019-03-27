const { deletePost } = require('../utils')
const _db = require('../../database/wrapper')

module.exports = async (user, postId) => {
  let post = await _db.db.collections.posts.findOne({ _id: postId })
  if (!user || (user.role !== 'admin' && user._id !== post.ownerId)) throw Error('not authorized')
  if (!postId) throw Error('missing post parameters')

  return deletePost(postId)
}