const _db = require('../../database/wrapper')

module.exports = async (user, filter = {}) => {
  if (!user || user.role !== 'admin') throw Error('not authorized')

  return _db.db.collections.users.findMany(filter)
}
