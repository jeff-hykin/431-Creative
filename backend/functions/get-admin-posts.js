const _db = require('../../database/wrapper')

module.exports = async (user, filter = {}) => {
  if (!user || user.role !== 'admin') throw Error('not authorized')

  let posts = await _db.db.collections.posts.findMany()
  let userIds = []

  posts.forEach(function (post) {
    userIds.push(post.ownerId)
  })

  let users = await _db.db.collections.users.findMany({ _id: { $in: userIds } })

  posts.forEach(function (post) {
    let user = users.find(cu => cu._id === post.ownerId)
    if (user) { post.email = user.email }
    if (post.description.length > 20) {
      post.description = post.description.substring(0, 18) + '...'
    }
  })

  return posts
}
