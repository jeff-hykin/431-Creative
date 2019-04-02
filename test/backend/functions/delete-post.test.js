let { assert } = require('chai')

let dbFunctions = require('../../../database/wrapper')
let { DEFAULT_DB, USER_COLLECTION, POST_COLLECTION } = require('../../../database/wrapper-impl')

const deletePost = require('../../../backend/functions/delete-post')
const { createUser, createPost } = require('../../../backend/utils')

describe('Delete User', function () {
  let db
  let POST_ID
  let USER_ID

  before(async function () {
    db = await dbFunctions.connect()
    USER_ID = (await createUser('temp@gmail.com', 'TEMP', 'TEMPLAST')).ops[0]._id
  })

  beforeEach(async function () {
    POST_ID = (await createPost(USER_ID, 'TEST_TITLE', 'THIS IS A DESCRIPTION', {}, ['Python'])).upsertedId._id
  })

  describe('#delete-post', function () {
    it('should delete the post if admin', async function () {
      await deletePost({ _id: 'NOT_AN_ID', role: 'admin' }, POST_ID)
      let post = await db.db(`${DEFAULT_DB}-test`).collection(POST_COLLECTION).findOne({
        _id: POST_ID
      })
      assert(!post)
    })

    it('should delete the post if post owner', async function () {
      await deletePost({ _id: USER_ID, role: '' }, POST_ID)
      let post = await db.db(`${DEFAULT_DB}-test`).collection(POST_COLLECTION).findOne({
        _id: POST_ID
      })
      assert(!post)
    })

    it('should throw unauthorized if not admin or post owner', async function () {
      let errStr = ''
      try {
        await deletePost({ _id: 'NOT_AN_ID', role: '' }, POST_ID)
      } catch (err) {
        errStr = err.toString()
      }
      assert.strictEqual(errStr, 'Error: not authorized')

      await db.db(`${DEFAULT_DB}-test`).collection(POST_COLLECTION).deleteOne({ _id: POST_ID })
    })

    it('should return w/ error for missing parameters', async function () {
      let errStr = ''
      try {
        await deletePost({ _id: USER_ID, role: 'admin' }, null)
      } catch (err) {
        errStr = err.toString()
      }
      assert.strictEqual(errStr, 'Error: missing post parameters')

      // delete the post manually to clean up
      await db.db(`${DEFAULT_DB}-test`).collection(POST_COLLECTION).deleteOne({ _id: POST_ID })
    })
  })

  // afterEach(async function () {
  // })

  after(async function () {
    await db.db(`${DEFAULT_DB}-test`).collection(USER_COLLECTION).deleteOne({ _id: USER_ID })
    await db.db(`${DEFAULT_DB}-test`).collection(USER_COLLECTION).drop()
    dbFunctions.close()
  })
})
