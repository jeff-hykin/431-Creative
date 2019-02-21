import { expect } from 'chai'

describe('DatabaseWrapper', function () {
  describe('Connection functions', function () {
    describe('#connect()', function () {
      it('connects to MongoDB', async function () {
        
      })
    })

    describe('#close()', function () {
      it('closes the MongoDB connection', async function () {

      })
    })

    describe('#getDb()', function () {
      it('gets the connected db variable', async function () {

      })
    })
  })

  // Post test cases
  describe('Post functions', function () {
    before(async function () {
      // before:connect and seed test post data to database
    })

    describe('#insertOne()', function () {
      it('should create a post inside of the db', async function () {

      })
    })

    describe('#insertMany()', function () {
      it('should create multiple posts inside of the db', async function () {

      })
    })

    describe('#findOne()', function () {
      it('should get a single post from the db', async function () {

      })
    })

    describe('#findMany()', function () {
      it('should get multiple posts from the db', async function () {

      })
    })

    describe('#updateOne()', function () {
      it('should update an existing post in the db', async function () {

      })
    })

    describe('#updateMany()', function () {
      it('should update multiple posts from the db', async function () {

      })
    })

    describe('#deleteOne()', function () {
      it('should delete a post from the db', async function () {

      })
    })

    describe('#deleteMany()', function () {
      it('should delete multiple posts from the db', async function () {

      })
    })

    after(async function () {
      // after:drop Post collection and disconnect
    })
  })

  // User test cases
  describe('User functions', function () {
    before(async function () {
      // before:connect and seed test user data to database
    })

    describe('#insertOne()', function () {
      it('should create a user inside of the db', async function () {

      })
    })

    describe('#insertMany()', function () {
      it('should create multiple users inside of the db', async function () {

      })
    })

    describe('#findOne()', function () {
      it('should get a single user from the db', async function () {

      })
    })

    describe('#findMany()', function () {
      it('should get multiple users from the db', async function () {

      })
    })

    describe('#updateOne()', function () {
      it('should update an existing user in the db', async function () {

      })
    })

    describe('#updateMany()', function () {
      it('should update multiple users from the db', async function () {

      })
    })

    describe('#deleteOne()', function () {
      it('should delete a user from the db', async function () {

      })
    })

    describe('#deleteMany()', function () {
      it('should delete multiple users from the db', async function () {

      })
    })

    after(async function () {
      // after:drop User collection and disconnect
    })
  })
})