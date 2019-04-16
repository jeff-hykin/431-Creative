const { After, Before } = require('cucumber')
let dbFunctions = require('../../database/wrapper')
let { DEFAULT_DB, USER_COLLECTION, POST_COLLECTION } = require('../../database/wrapper-impl')
let postSeeds = require('../../test/database/seeds/post-seeds')
let userSeeds = require('../../test/database/seeds/user-seeds')
let doneOnce = false

Before(async function () {
  if (!doneOnce) {
    try {
      let db = await dbFunctions.connect()
      await db.db(`${DEFAULT_DB}`).collection(POST_COLLECTION).insertMany(postSeeds)
      let postSeed2 = postSeeds
      postSeed2[0]._id = '1ABCD234'
      await db.db(`${DEFAULT_DB}`).collection(POST_COLLECTION).insertMany(postSeed2)
      await db.db(`${DEFAULT_DB}`).collection(USER_COLLECTION).insertMany(userSeeds)
      doneOnce = true
    } catch (err) {
      console.log(err)
    }
  }
})

After(function () {
  return this.driver.quit()
})
