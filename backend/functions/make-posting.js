const { createPost } = require('../utils')

module.exports = async (user, data) => {
  if (!user) throw Error('not authorized')
  if (!data.title || !data.description || !data.contactInfo || !data.skills) throw Error('missing post parameters')

  return createPost(user._id, data.title, data.description, data.contactInfo, data.skills)
}
