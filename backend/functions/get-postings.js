const _db = require('../../database/wrapper')

module.exports = async (user, query = {}, projection) => {
  if (!user) throw Error('not authorized')

  let result = await _db.db.collections.posts.findMany(query, projection)
  return result
}
