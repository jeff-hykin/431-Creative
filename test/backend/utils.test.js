require('babel-polyfill')
let { assert } = require('chai')

const dbFunctions = require('../../database/wrapper')
const { DEFAULT_DB } = require('../../database/wrapper-impl')
const utils = require('../../backend/utils')

describe('Utils-Backend', function () {
  let db

  before(async function () {
    db = await dbFunctions.connect()
    await db.db(`${DEFAULT_DB}-test`)
  })

  describe('#createUser', function () {
    it('should create a user', async function () {
      let email = 'test1@test.com'
      let result = await utils.createUser(email)

      assert.strictEqual(result['insertedCount'], 1, 'successfully inserted user')
    })
  })

  describe('#createPost', function () {
    it('should create a post and add to user profile', async function () {
      // Add user
      let email = 'test1@test.com'
      let result = await utils.createUser(email)
      assert.strictEqual(result['insertedCount'], 1, 'successfully inserted user')
      const USER_ID = result['ops'][0]._id

      // Add post
      result = await utils.createPost(USER_ID, 'TITLE', 'DESCRIPTION', {}, [], null)
      assert.strictEqual(result.result.ok, 1, 'successfully inserted post')
      const POST_ID = result.upsertedId._id

      // Check if user has post
      let user = await dbFunctions.db.collections.users.findOne({ _id: USER_ID })
      assert.include(user.myPosts, POST_ID)
    })
  })

  describe('#deleteUser', function () {
    it('should remove posts associated with the user', async function () {
      // Add user
      let email = 'test1@test.com'
      let result = await utils.createUser(email)
      assert.strictEqual(result['insertedCount'], 1, 'successfully inserted user')
      const USER_ID = result['ops'][0]._id

      // Add post
      result = await utils.createPost(USER_ID, 'TITLE', 'DESCRIPTION', {}, ['TEST'])
      assert.strictEqual(result.result.ok, 1, 'successfully inserted post')
      const POST_ID = result.upsertedId._id

      // delete user and check post no longer exists
      result = await utils.deleteUser(USER_ID)
      let post = await dbFunctions.db.collections.posts.findOne({ _id: POST_ID })
      assert.isNull(post)
    })

    it('should delete the user', async function () {
      // Add user
      let email = 'test1@test.com'
      let result = await utils.createUser(email)
      assert.strictEqual(result['insertedCount'], 1, 'successfully inserted user')
      const USER_ID = result['ops'][0]._id

      // delete user
      result = await utils.deleteUser(USER_ID)

      assert.strictEqual(result.deletedCount, 1)
    })
  })

  describe('#deletePost', function () {
    it('should remove postId from with the user\'s post', async function () {
      // Add user
      let email = 'test1@test.com'
      let result = await utils.createUser(email)
      assert.strictEqual(result['insertedCount'], 1, 'successfully inserted user')
      const USER_ID = result['ops'][0]._id

      // Add post
      result = await utils.createPost(USER_ID, 'TITLE', 'DESCRIPTION', {}, ['TEST'])
      assert.strictEqual(result.result.ok, 1, 'successfully inserted post')
      const POST_ID = result.upsertedId._id

      // delete post and check user no longer has it
      result = await utils.deletePost(POST_ID)
      let user = await dbFunctions.db.collections.users.findOne({ _id: USER_ID })
      assert.notInclude(user.myPosts, POST_ID)
    })

    it('should delete the post', async function () {
      // Add user
      let email = 'test1@test.com'
      let result = await utils.createUser(email)
      assert.strictEqual(result['insertedCount'], 1, 'successfully inserted user')
      const USER_ID = result['ops'][0]._id

      // Add post
      result = await utils.createPost(USER_ID, 'TITLE', 'DESCRIPTION', {}, ['TEST'])
      assert.strictEqual(result.result.ok, 1, 'successfully inserted post')
      const POST_ID = result.upsertedId._id

      // delete post
      result = await utils.deletePost(POST_ID)
      assert.strictEqual(result.deletedCount, 1)
    })
  })

  after(async function () {
    dbFunctions.close()
  })
})
