const { Given, Then } = require('cucumber')
const { expect, assert } = require('chai')
const { By } = require('selenium-webdriver')

Given(/^I am on the about page$/, function () {
  return this.driver.get('http://localhost:3000/')
})

Then(/^I will see "(.*)" on the page$/, async function (str) {
  try {
    await this.driver.findElements(By.id(str)).then( function (elems) {
      expect(elems.length).to.equal(1)
    })
  } catch(err) {
    console.log(err)
    assert.isNotOk('about page', 'about not found')
  }
})
