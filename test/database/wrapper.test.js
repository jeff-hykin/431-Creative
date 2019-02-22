require('babel-polyfill')
// const mongo = require('mongodb')
let { assert } = require('chai')

let dbFunctions = require('../../database/wrapper')
let { DEFAULT_DB, USER_COLLECTION, POST_COLLECTION } = require('../../database/wrapper-impl')
let postSeeds = require('./seeds/post-seeds')
let userSeeds = require('./seeds/user-seeds')

// const options = { useNewUrlParser: true }

describe('DatabaseWrapper', function () {
  describe('Connection functions', function () {
    describe('#connect()', function () {
      it('connects to MongoDB', async function () {
        let db = await dbFunctions.connect()
        assert.isOk(db, 'db is good')
      })
    })

    describe('#getDb()', function () {
      it('gets the connected db variable', function () {
        assert.isOk(dbFunctions.db[dbFunctions.DANGEROUS_DB], 'db is good')
      })
    })

    describe('#close()', function () {
      it('closes the MongoDB connection', function () {
        assert.doesNotThrow(dbFunctions.close)
      })
    })
  })

  // Post test cases
  describe('Post functions', function () {
    let db
    before(async function () {
      // before:connect and seed test post data to database
      db = await dbFunctions.connect()
      await db.db(`${DEFAULT_DB}-test`).collection(POST_COLLECTION).insertMany(postSeeds)
    })

    describe('#insertOne()', function () {
      it('should create a post inside of the db', async function () {
        let id = 'uniquePostId'
        let result = await dbFunctions.db.collections.posts.insertOne({
          _id: id,
          title: 'New Post'
        })
        assert.strictEqual(result['insertedId'], id, 'inserted ID is the same as the post inserted')
      })
    })

    describe('#insertMany()', function () {
      it('should create multiple posts inside of the db', async function () {
        let id1 = 'uniquePostId1'
        let id2 = 'uniquePostId2'
        let result = await dbFunctions.db.collections.posts.insertMany([{
          _id: id1,
          title: 'New Post'
        }, {
          _id: id2,
          title: 'New Post 2'
        }])
        assert.include(Object.values(result['insertedIds']), id1, 'inserted ID 1 is the same as one of the posts inserted')
        assert.include(Object.values(result['insertedIds']), id2, 'inserted ID 2 is the same as one of the posts inserted')
      })
    })

    describe('#findOne()', function () {
      it('should get a single post from the db', async function () {
        let post = await dbFunctions.db.collections.posts.findOne({ _id: 'POST1234567890' })
        assert.isObject(post, 'received an object')
        assert.include(post, { _id: 'POST1234567890' }, 'found object w/ requested ID')
      })
    })

    describe('#findMany()', function () {
      it('should get multiple posts from the db', async function () {
        let posts = await dbFunctions.db.collections.posts.findMany()
        assert.isArray(posts, 'received array of posts')
        assert.isAtLeast(posts.length, 1, 'received at least one post')
      })
    })

    describe('#updateOne()', function () {
      it('should update an existing post in the db', async function () {
        let resultDoc = await dbFunctions.db.collections.posts.updateOne({ _id: 'POST1234567890' }, { $set: { title: 'DEV WORK NEEDED' } })
        assert.strictEqual(resultDoc['modifiedCount'], 1, 'updated a post')
      })
    })

    describe('#updateMany()', function () {
      it('should update multiple posts from the db', async function () {
        let resultDoc = await dbFunctions.db.collections.posts.updateMany({ skills: { $elemMatch: { $eq: 'Python' } } }, { $push: { skills: 'Node' } })
        assert.isAtLeast(resultDoc['modifiedCount'], 1, 'updated a/multiple post(s)')
      })
    })

    describe('#deleteOne()', function () {
      it('should delete a post from the db', async function () {
        let resultDoc = await dbFunctions.db.collections.posts.deleteOne({ _id: 'POST1234567890' })
        assert.strictEqual(resultDoc['deletedCount'], 1, 'deleted a post')
      })
    })

    describe('#deleteMany()', function () {
      it('should delete multiple posts from the db', async function () {
        let resultDoc = await dbFunctions.db.collections.posts.deleteMany({ $where: function () {
          return this._id.includes('uniquePost')
        } })
        assert.strictEqual(resultDoc['deletedCount'], 3, 'deleted multiple posts')
      })
    })

    after(async function () {
      // after:drop Post collection and disconnect
      await db.db(`${DEFAULT_DB}-test`).collection(POST_COLLECTION).drop()
      dbFunctions.close()
    })
  })

  // User test cases
  describe('User functions', function () {
    let db
    before(async function () {
      // before:connect and seed test user data to database
      db = await dbFunctions.connect()
      await db.db(`${DEFAULT_DB}-test`).collection(USER_COLLECTION).insertMany(userSeeds)
    })

    describe('#insertOne()', function () {
      it('should create a user inside of the db', async function () {
        let id = 'uniqueUserId'
        let result = await dbFunctions.db.collections.users.insertOne({
          _id: id,
          firstname: 'user'
        })
        assert.strictEqual(result['insertedId'], id, 'inserted ID is the same as the user inserted')
      })
    })

    describe('#insertMany()', function () {
      it('should create multiple users inside of the db', async function () {
        let id1 = 'uniqueUserId1'
        let id2 = 'uniqueUserId2'
        let result = await dbFunctions.db.collections.users.insertMany([{
          _id: id1,
          firstname: 'User1'
        }, {
          _id: id2,
          firstname: 'User2'
        }])
        assert.include(Object.values(result['insertedIds']), id1, 'inserted ID 1 is the same as one of the users inserted')
        assert.include(Object.values(result['insertedIds']), id2, 'inserted ID 2 is the same as one of the users inserted')
      })
    })

    describe('#findOne()', function () {
      it('should get a single user from the db', async function () {
        let user = await dbFunctions.db.collections.users.findOne({ _id: 'USER1234567890' })
        assert.isObject(user, 'received an object')
        assert.include(user, { _id: 'USER1234567890' }, 'found object w/ requested ID')
      })
    })

    describe('#findMany()', function () {
      it('should get multiple users from the db', async function () {
        let users = await dbFunctions.db.collections.users.findMany()
        assert.isArray(users, 'received array of users')
        assert.isAtLeast(users.length, 1, 'received at least one user')
      })
    })

    describe('#updateOne()', function () {
      it('should update an existing user in the db', async function () {
        let resultDoc = await dbFunctions.db.collections.users.updateOne({ _id: 'USER1234567890' }, { $set: { firstname: 'Jane' } })
        assert.strictEqual(resultDoc['modifiedCount'], 1, 'updated a post')
      })
    })

    describe('#updateMany()', function () {
      it('should update multiple users from the db', async function () {
        let resultDoc = await dbFunctions.db.collections.users.updateMany({ skills: { $elemMatch: { $eq: 'Java' } } }, { $push: { skills: 'Node' } })
        assert.isAtLeast(resultDoc['modifiedCount'], 1, 'updated a/multiple user(s)')
      })
    })

    describe('#deleteOne()', function () {
      it('should delete a user from the db', async function () {
        let resultDoc = await dbFunctions.db.collections.users.deleteOne({ _id: 'USER1234567890' })
        assert.strictEqual(resultDoc['deletedCount'], 1, 'deleted a user')
      })
    })

    describe('#deleteMany()', function () {
      it('should delete multiple users from the db', async function () {
        let resultDoc = await dbFunctions.db.collections.users.deleteMany({ $where: function () {
          return this._id.includes('uniqueUser')
        } })
        assert.strictEqual(resultDoc['deletedCount'], 3, 'deleted multiple users')
      })
    })

    after(async function () {
      // after:drop User collection and disconnect
      await db.db(`${DEFAULT_DB}-test`).collection(USER_COLLECTION).drop()
      dbFunctions.close()
    })
  })
})
