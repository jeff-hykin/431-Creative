const _db = require('../../database/wrapper')

module.exports = async (user, userId) => {
  if (!user || user.role !== 'admin') throw Error('not authorized')
  if (!userId) throw Error('missing post parameters')

  // Check to see if user already exists
  let result = await _db.db.collections.users.updateOne({ _id: userId }, { $set: { role: '' } })
  if (result.modifiedCount === 0) throw Error('could not update user. User may not exist')
  return true
}
