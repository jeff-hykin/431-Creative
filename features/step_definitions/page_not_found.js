const { Given, Then } = require('cucumber')
const { assert, expect } = require('chai')
const { By } = require('selenium-webdriver')

Given(/^I go to a nonexistent URL$/, async function () {
  await this.driver.get('http://localhost:3000/doesnotexist')
})

Then(/^I am on the 404 page$/, async function () {
  await this.driver.findElements(By.id('page-not-found')).then(async function (elems) {
    expect(elems.length).to.equal(1)
  })
})
