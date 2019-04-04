const { deleteUser } = require('../utils')

module.exports = async (user, userId) => {
  if (!user || user.role !== 'admin') throw Error('not authorized')
  if (!userId) throw Error('missing post parameters')

  return deleteUser(userId)
}
