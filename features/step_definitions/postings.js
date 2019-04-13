const { When, Then } = require('cucumber')
const { expect } = require('chai')
const { By } = require('selenium-webdriver')

Then(/^I am on the postings page$/, async function () {
  await this.driver.findElements(By.id('postingTitle')).then(function (elems) {
    expect(elems.length).to.equal(1)
  })
})

When(/^I click the about button$/, async function () {
  await this.driver.findElement(By.id('about')).click()
})

When(/^I click the dashboard button$/, async function () {
  await this.driver.findElement(By.id('dashboard')).click()
})

When(/^I click the make posting button$/, async function () {
  await this.driver.findElement(By.id('makeposting')).click()
})

Then(/^I am on the make posting page$/, async function () {
  let URL = await this.driver.getCurrentUrl()
  expect(URL).to.equal('http://localhost:3000/makeposting')
})
