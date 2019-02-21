// Connection screen
// mongodb://dbAdmin:<PASSWORD>@prodcluster-shard-00-00-zwe3b.mongodb.net:27017,prodcluster-shard-00-01-zwe3b.mongodb.net:27017,prodcluster-shard-00-02-zwe3b.mongodb.net:27017/test?ssl=true&replicaSet=ProdCluster-shard-0&authSource=admin&retryWrites=true
const mongo = require('mongodb')

let db

const DEFAULT_DB = 'devsearch'
const POST_COLLECTION = 'posts'
const USER_COLLECTION = 'users'

function connect (database = DEFAULT_DB) {
  const options = { useNewUrlParser: true }

  if (process.env.NODE_ENV === 'development') {
    mongo.MongoClient.connect(`mongodb://localhost:27017/${database}`, options, (err, database) => {
      if (err) throw err
      db = database
    })
  } else if (process.env.NODE_ENV === 'testing') {
    mongo.MongoClient.connect(`mongodb://localhost:27017/${database}-test`, options, (err, database) => {
      if (err) throw err
      db = database
    })
  } else if (process.env.NODE_ENV === 'production') {
    mongo.MongoClient.connect(`
    mongodb://dbAdmin:${process.env.DB_PASS}@prodcluster-shard-00-00-zwe3b.mongodb.net:27017,
    prodcluster-shard-00-01-zwe3b.mongodb.net:27017,
    prodcluster-shard-00-02-zwe3b.mongodb.net:27017/${database}?ssl=true&replicaSet=ProdCluster-shard-0&authSource=admin&retryWrites=true`, options, (err, database) => {
      if (err) throw err
      db = database
    })
  }
}

function close () {
  db.close()
}

function getDb () {
  return db
}

/* Create Operations */

async function insertOnePost (document) {
  let postCollection = db.collection(POST_COLLECTION)
  let result = await postCollection.insertOne(document)
  return result
}

async function insertManyPosts (documents, ordered = true) {
  let postCollection = db.collection(POST_COLLECTION)
  let result = await postCollection.insertMany(documents, { ordered })
  return result
}

async function insertOneUser (document) {
  let userCollection = db.collection(USER_COLLECTION)
  let result = await userCollection.insertOne(document)
  return result
}

async function insertManyUsers (documents, ordered = true) {
  let userCollection = db.collection(USER_COLLECTION)
  let result = await userCollection.insertMany(documents, { ordered })
  return result
}

/* Read Operations */

async function findOnePost (query={}, projection={}) {
  let postCollection = db.collection(POST_COLLECTION)
  return await postCollection.findOne(query, projection)
}

async function findManyPosts (query={}, projection={}) {
  let postCollection = db.collection(POST_COLLECTION)
  return await postCollection.find(query, projection).toArray()
}

async function findOneUser (query, projection={}) {
  let userCollection = db.collection(USER_COLLECTION)
  return await userCollection.findOne(query, projection)
}

async function findManyUsers (query, projection={}) {
  let userCollection = db.collection(USER_COLLECTION)
  return await userCollection.find(query, projection).toArray()
}

/* Update Operations */

async function updateOnePost (filter, update, options={}) {
  let postCollection = db.collection(POST_COLLECTION)
  return await postCollection.updateOne(filter, update, options)
}

async function updateManyPosts (filter, update, options={}) {
  let postCollection = db.collection(POST_COLLECTION)
  return await postCollection.updateMany(filter, update, options)
}

async function updateOneUser (filter, update, options={}) {
  let userCollection = db.collection(USER_COLLECTION)
  return await userCollection.updateOne(filter, update, options)
}

async function updateManyUsers (filter, update, options={}) {
  let userCollection = db.collection(USER_COLLECTION)
  return await userCollection.updateMany(filter, update, options)
}

/* Delete Operations */

async function deleteOnePost (filter, options={}) {
  let postCollection = db.collection(POST_COLLECTION)
  return await postCollection.deleteOne(filter, options)
}

async function deleteManyPosts (filter, options={}) {
  let postCollection = db.collection(POST_COLLECTION)
  return await postCollection.deleteMany(filter, options)
}

async function deleteOneUser (filter, options={}) {
  let userCollection = db.collection(USER_COLLECTION)
  return await userCollection.deleteOne(filter, options)
}

async function deleteManyUsers (filter, options={}) {
  let userCollection = db.collection(USER_COLLECTION)
  return await userCollection.deleteMany(filter, options)
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
  deleteManyUsers
}