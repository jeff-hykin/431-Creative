// Connection screen
// mongodb://dbAdmin:<PASSWORD>@prodcluster-shard-00-00-zwe3b.mongodb.net:27017,prodcluster-shard-00-01-zwe3b.mongodb.net:27017,prodcluster-shard-00-02-zwe3b.mongodb.net:27017/test?ssl=true&replicaSet=ProdCluster-shard-0&authSource=admin&retryWrites=true
const mongo = require('mongodb')

let db

const DEFAULT_DB = 'devsearch'
const POST_COLLECTION = 'posts'
const TEST_POST_COLLECTION = 'testPosts'
const USER_COLLECTION = 'users'
const TEST_USER_COLLECTION = 'testUsers'

function connect (database = DEFAULT_DB) {
  const options = { useNewUrlParser: true }

  if (process.env.NODE_ENV === 'development') {
    mongo.MongoClient.connect(`mongodb://localhost:27017/${database}`, options, (err, database) => {
      if (err) throw err
      db = database
    })
  } else if (process.env.NODE_ENV === 'testing') {
    mongo.MongoClient.connect(`mongodb://localhost:27017/${database}`, options, (err, database) => {
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

function getPostCollection () {
  if (process.env.NODE_ENV === 'testing') {
    return db.collection(TEST_POST_COLLECTION)
  } else {
    return db.collection(POST_COLLECTION)
  }
}

function getUserCollection () {
  if (process.env.NODE_ENV === 'testing') {
    return db.collection(TEST_USER_COLLECTION)
  } else {
    return db.collection(USER_COLLECTION)
  }
}

/* Create Operations */

async function insertOnePost (document) {
  let postCollection = getPostCollection()
  let result = await postCollection.insertOne(document)
  return result
}

async function insertManyPosts (documents, ordered = true) {
  let postCollection = getPostCollection()
  let result = await postCollection.insertMany(documents, { ordered })
  return result
}

async function insertOneUser (document) {
  let userCollection = getUserCollection()
  let result = await userCollection.insertOne(document)
  return result
}

async function insertManyUsers (documents, ordered = true) {
  let userCollection = getUserCollection()
  let result = await userCollection.insertMany(documents, { ordered })
  return result
}

/* Read Operations */

async function findOnePost (query, projection) {

}

async function findManyPosts (query, projection) {

}

async function findOneUser (query, projection) {

}

async function findManyUsers (query, projection) {

}

/* Update Operations */

async function updateOnePost () {

}

async function updateManyPosts () {

}

async function updateOneUser () {

}

async function updateManyUsers () {

}

/* Delete Operations */

async function deleteOnePost () {

}

async function deleteManyPosts () {

}

async function deleteOneUser () {

}

async function deleteManyUsers () {

}
