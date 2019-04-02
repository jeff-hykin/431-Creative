const _db = require('../../database/wrapper')

module.exports = async (user, query = {}, projection) => {
  let result = await _db.db.collections.posts.findMany(query, projection)
  return result
}
