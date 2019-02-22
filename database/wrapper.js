const helpers = require('./wrapper-impl')

const DANGEROUS_DB = Symbol('Dangerous DB Object')

module.exports = {
  DANGEROUS_DB,
  connect: helpers.connect,
  close: helpers.close,
  db: {
    [DANGEROUS_DB]: helpers.getDb,
    collections: {
      posts: {
        insertOne: helpers.insertOnePost,
        insertMany: helpers.insertManyPosts,
        findOne: helpers.findOnePost,
        findMany: helpers.findManyPosts,
        updateOne: helpers.updateOnePost,
        updateMany: helpers.updateManyPosts,
        deleteOne: helpers.deleteOnePost,
        deleteMany: helpers.deleteManyPosts
      },
      users: {
        insertOne: helpers.insertOneUser,
        insertMany: helpers.insertManyUsers,
        findOne: helpers.findOneUser,
        findMany: helpers.findManyUsers,
        updateOne: helpers.updateOneUser,
        updateMany: helpers.updateManyUsers,
        deleteOne: helpers.deleteOneUser,
        deleteMany: helpers.deleteManyUsers
      }
    }
  }
}
