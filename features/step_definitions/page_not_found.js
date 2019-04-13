const { Given, Then } = require('cucumber')
const { assert, expect } = require('chai')
const { By } = require('selenium-webdriver')

Given(/^I go to a nonexistent URL$/, function () {
  return this.driver.get('http://localhost:3000/doesnotexist')
})

Then(/^I should see "(.*)" on the page$/, function (str) {
  this.driver.findElements(By.className(str)).then(
    function (elems) {
      expect(elems.length).to.equal(1)
    }).catch(function (error) {
    console.log(error)
    assert.isNotOk('404 page', '404 element not found')
  })
})
