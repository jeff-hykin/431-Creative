let { assert } = require('chai')

let dbFunctions = require('../../../database/wrapper')
let { DEFAULT_DB, USER_COLLECTION } = require('../../../database/wrapper-impl')

const deleteUser = require('../../../backend/functions/delete-user')
const { createUser } = require('../../../backend/utils')

describe('Delete User', function () {
  let db
  let TEST_ID
  const ADMIN_ID = 'userID'

  before(async function () {
    db = await dbFunctions.connect()
    TEST_ID = (await createUser('temp@gmail.com', 'TEMP', 'TEMPLAST')).ops[0]._id
  })

  describe('#delete-user', function () {
    it('should delete the user', async function () {
      await deleteUser({ _id: ADMIN_ID, role: 'admin' }, TEST_ID)
      let user = await db.db(`${DEFAULT_DB}-test`).collection(USER_COLLECTION).findOne({
        _id: TEST_ID
      })
      assert(!user)
    })

    it('should throw unauthorized if not admin', async function () {
      let errStr = ''
      try {
        await deleteUser({ _id: ADMIN_ID, role: '' }, TEST_ID)
      } catch (err) {
        errStr = err.toString()
      }
      assert.strictEqual(errStr, 'Error: not authorized')
    })

    it('should return w/ error for missing parameters', async function () {
      let errStr = ''
      try {
        await deleteUser({ _id: ADMIN_ID, role: 'admin' }, null)
      } catch (err) {
        errStr = err.toString()
      }
      assert.strictEqual(errStr, 'Error: missing post parameters')
    })
  })

  after(async function () {
    await db.db(`${DEFAULT_DB}-test`).collection(USER_COLLECTION).deleteOne({ _id: TEST_ID })
    dbFunctions.close()
  })
})
