const { createPost } = require('../utils')

module.exports = async (user, data, postId) => {
  if (!user) throw Error('not authorized')
  if (!data.title || !data.description || !data.contactInfo || !data.skills) throw Error('missing post parameters')
  // TODO: Check to see if owner of post
  return createPost(user._id, data.title, data.description, data.contactInfo, data.skills, postId)
}
