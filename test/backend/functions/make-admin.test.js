let { assert } = require('chai')

let dbFunctions = require('../../../database/wrapper')
let { DEFAULT_DB, USER_COLLECTION } = require('../../../database/wrapper-impl')

const makeAdmin = require('../../../backend/functions/make-admin')
const { createUser } = require('../../../backend/utils')

describe('Make Admin', function () {
  let db
  let TEST_ID
  const ADMIN_ID = 'userID'

  before(async function () {
    db = await dbFunctions.connect()
    TEST_ID = (await createUser('temp@gmail.com', 'TEMP', 'TEMPLAST')).ops[0]._id
  })

  describe('#make-admin', function () {
    it('should make a user an admin', async function () {
      await makeAdmin({ _id: ADMIN_ID, role: 'admin' }, TEST_ID)
      let user = await db.db(`${DEFAULT_DB}-test`).collection(USER_COLLECTION).findOne({
        _id: TEST_ID
      })
      assert(user)
      assert.include(user, { role: 'admin' })
    })

    it('should throw unauthorized if not admin', async function () {
      let errStr = ''
      try {
        await makeAdmin({ _id: ADMIN_ID, role: '' }, TEST_ID)
      } catch (err) {
        errStr = err.toString()
      }
      assert.strictEqual(errStr, 'Error: not authorized')
    })

    it('should return w/ error for missing parameters', async function () {
      let errStr = ''
      try {
        await makeAdmin({ _id: ADMIN_ID, role: 'admin' }, null)
      } catch (err) {
        errStr = err.toString()
      }
      assert.strictEqual(errStr, 'Error: missing post parameters')
    })

    it('should return w/ error for failed update', async function () {
      let errStr = ''
      try {
        await makeAdmin({ _id: ADMIN_ID, role: 'admin' }, 'NON_EXISTENT')
      } catch (err) {
        errStr = err.toString()
      }
      assert.strictEqual(errStr, 'Error: could not update user. User may not exist')
    })
  })

  after(async function () {
    await db.db(`${DEFAULT_DB}-test`).collection(USER_COLLECTION).deleteOne({ _id: TEST_ID })
    dbFunctions.close()
  })
})
