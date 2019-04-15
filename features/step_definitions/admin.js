const { When ,Then } = require('cucumber')
const { expect } = require('chai')
const { By } = require('selenium-webdriver')
let postSeeds = require('../../test/database/seeds/post-seeds')
let userSeeds = require('../../test/database/seeds/user-seeds')

When(/^I click the admin button$/, async function () {
  await this.driver.findElement(By.id('switchTable')).click()
})

When(/^I am on the users tab$/, async function () {
  await this.driver.findElement(By.id('users')).click()
})

Then(/^I see all users$/, async function () {
  await this.driver.findElements(By.id('userList')).then( async function (elems) {
    expect(elems.length).to.equal(1)
  })
})

When(/^I click the delete button for a user$/, async function () {
  await this.driver.findElement(By.id(`deleteButton${userSeeds[0].email}`)).click()
})

Then(/^I do not see the user$/, async function () {
  await this.driver.findElements(By.id(`deleteButton${userSeeds[0].email}`)).then( async function (elems) {
    expect(elems.length).to.equal(0)
  })
})

Then(/^I see all posts$/, async function () {
  await this.driver.findElements(By.id('postList')).then(async function (elems) {
    expect(elems.length).to.equal(1)
  })
})

When(/^I click the delete button on a posting$/, async function () {
  await this.driver.findElement(By.id(`deleteButton${postSeeds[0]._id}`)).click()
})
// Then I do not see the posting
Then(/^I do not see the posting$/, async function () {
  await this.driver.findElements(By.id(`deleteButton${postSeeds[0]._id}`)).then(async function (elems) {
    expect(elems.length).to.equal(0)
  })
})