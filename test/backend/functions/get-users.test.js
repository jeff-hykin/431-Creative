let { assert } = require('chai')

let dbFunctions = require('../../../database/wrapper')
let { DEFAULT_DB, USER_COLLECTION } = require('../../../database/wrapper-impl')

const getUsers = require('../../../backend/functions/get-users')
const { createUser } = require('../../../backend/utils')

describe('Get Users', function () {
  let db
  let TEST_ID
  const ADMIN_ID = 'userID'

  before(async function () {
    db = await dbFunctions.connect()
    TEST_ID = (await createUser('temp@gmail.com', 'TEMP', 'TEMPLAST')).ops[0]._id
  })

  describe('#get-users', function () {
    it('should get list of users', async function () {
      let users = await getUsers({ _id: ADMIN_ID, role: 'admin' })
      assert.isArray(users)
    })

    it('should throw unauthorized if not admin', async function () {
      let errStr = ''
      try {
        await getUsers({ _id: ADMIN_ID, role: '' })
      } catch (err) {
        errStr = err.toString()
      }
      assert.strictEqual(errStr, 'Error: not authorized')
    })
  })

  after(async function () {
    await db.db(`${DEFAULT_DB}-test`).collection(USER_COLLECTION).deleteOne({ _id: TEST_ID })
    dbFunctions.close()
  })
})
