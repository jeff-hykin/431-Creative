const { Given, Then } = require('cucumber')
const { expect, assert } = require('chai')
const { By } = require('selenium-webdriver')

Given(/^I am on the about page$/, function () {
  return this.driver.get('http://localhost:3000/')
})

Then(/^I should see "(.*)" .* on the page$/, function (str) {
  this.driver.findElements(By.id(str)).then(
    function (elems) {
      expect(elems.length).to.equal(1)
    }).catch(function (error) {
    console.log(error)
    assert.isNotOk('about page', 'about not found')
  })
})
