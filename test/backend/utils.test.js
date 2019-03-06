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

  after(async function () {
    dbFunctions.close()
  })
})
