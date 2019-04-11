const { When, Then } = require('cucumber')
const { expect } = require('chai')
const { By } = require('selenium-webdriver')
const sleep = require('sleep')

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
  await this.driver.findElement(By.id('newposting')).click()
})
