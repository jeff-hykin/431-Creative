// Connection screen
// mongodb://dbAdmin:<PASSWORD>@prodcluster-shard-00-00-zwe3b.mongodb.net:27017,prodcluster-shard-00-01-zwe3b.mongodb.net:27017,prodcluster-shard-00-02-zwe3b.mongodb.net:27017/test?ssl=true&replicaSet=ProdCluster-shard-0&authSource=admin&retryWrites=true
const mongo = require('mongodb')

let db
let dbo

const DEFAULT_DB = 'devsearch'
const POST_COLLECTION = 'posts'
const USER_COLLECTION = 'users'

async function connect (database = DEFAULT_DB) {
  const options = { useNewUrlParser: true }

  /* istanbul ignore if */
  if (process.env.NODE_ENV === 'development') {
    /* istanbul ignore next */
    db = await mongo.MongoClient.connect(`mongodb://localhost:27017/${database}`, options)
    /* istanbul ignore next */
    dbo = db.db(database)
  }

  if (process.env.NODE_ENV === 'testing') {
    db = await mongo.MongoClient.connect(`mongodb://localhost:27017/${database}-test`, options)
    dbo = db.db(`${database}-test`)
  }

  /* istanbul ignore if */
  if (process.env.NODE_ENV === 'production') {
    db = await mongo.MongoClient.connect(`
    mongodb://dbAdmin:${process.env.DB_PASS}@prodcluster-shard-00-00-zwe3b.mongodb.net:27017,
    prodcluster-shard-00-01-zwe3b.mongodb.net:27017,
    prodcluster-shard-00-02-zwe3b.mongodb.net:27017/${database}?ssl=true&replicaSet=ProdCluster-shard-0&authSource=admin&retryWrites=true`, options)
    dbo = db.db(database)
  }
  return db
}

function close () {
  db.close()
}

function getDb () {
  return db
}

/* Create Operations */

async function insertOnePost (document) {
  let postCollection = dbo.collection(POST_COLLECTION)
  let result = await postCollection.insertOne(document)
  return result
}

async function insertManyPosts (documents, ordered = true) {
  let postCollection = dbo.collection(POST_COLLECTION)
  let result = await postCollection.insertMany(documents, { ordered })
  return result
}

async function insertOneUser (document) {
  let userCollection = dbo.collection(USER_COLLECTION)
  let result = await userCollection.insertOne(document)
  return result
}

async function insertManyUsers (documents, ordered = true) {
  let userCollection = dbo.collection(USER_COLLECTION)
  let result = await userCollection.insertMany(documents, { ordered })
  return result
}

/* Read Operations */

async function findOnePost (query, projection = {}) {
  let postCollection = dbo.collection(POST_COLLECTION)
  let post = await postCollection.findOne(query, projection)
  return post
}

async function findManyPosts (query, projection = {}) {
  let postCollection = dbo.collection(POST_COLLECTION)
  let posts = await postCollection.find(query, projection).toArray()
  return posts
}

async function findOneUser (query, projection = {}) {
  let userCollection = dbo.collection(USER_COLLECTION)
  let user = await userCollection.findOne(query, projection)
  return user
}

async function findManyUsers (query, projection = {}) {
  let userCollection = dbo.collection(USER_COLLECTION)
  let users = await userCollection.find(query, projection).toArray()
  return users
}

/* Update Operations */

async function updateOnePost (filter, update, options = {}) {
  let postCollection = dbo.collection(POST_COLLECTION)
  let resultDocument = await postCollection.updateOne(filter, update, options)
  return resultDocument
}

async function updateManyPosts (filter, update, options = {}) {
  let postCollection = dbo.collection(POST_COLLECTION)
  let resultDocument = await postCollection.updateMany(filter, update, options)
  return resultDocument
}

async function updateOneUser (filter, update, options = {}) {
  let userCollection = dbo.collection(USER_COLLECTION)
  let resultDocument = await userCollection.updateOne(filter, update, options)
  return resultDocument
}

async function updateManyUsers (filter, update, options = {}) {
  let userCollection = dbo.collection(USER_COLLECTION)
  let resultDocument = await userCollection.updateMany(filter, update, options)
  return resultDocument
}

/* Delete Operations */

async function deleteOnePost (filter, options = {}) {
  let postCollection = dbo.collection(POST_COLLECTION)
  let resultDocument = await postCollection.deleteOne(filter, options)
  return resultDocument
}

async function deleteManyPosts (filter, options = {}) {
  let postCollection = dbo.collection(POST_COLLECTION)
  let resultDocument = await postCollection.deleteMany(filter, options)
  return resultDocument
}

async function deleteOneUser (filter, options = {}) {
  let userCollection = dbo.collection(USER_COLLECTION)
  let resultDocument = await userCollection.deleteOne(filter, options)
  return resultDocument
}

async function deleteManyUsers (filter, options = {}) {
  let userCollection = dbo.collection(USER_COLLECTION)
  let resultDocument = await userCollection.deleteMany(filter, options)
  return resultDocument
}

module.exports = {
  connect,
  close,
  getDb,
  insertOnePost,
  insertManyPosts,
  insertOneUser,
  insertManyUsers,
  findOnePost,
  findManyPosts,
  findOneUser,
  findManyUsers,
  updateOnePost,
  updateManyPosts,
  updateOneUser,
  updateManyUsers,
  deleteOnePost,
  deleteManyPosts,
  deleteOneUser,
  deleteManyUsers,
  DEFAULT_DB,
  USER_COLLECTION,
  POST_COLLECTION
}
