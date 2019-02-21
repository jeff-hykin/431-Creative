const assert = require('assert')
const { Given, When, Then } = require('cucumber')

function testFunction (value) {
  return value
}

Given('I am on the splash page', function () {
  // Write code here that turns the phrase above into concrete actions
  this.value = 'a value'
})

When('I try to click a button', function () {
  // Write code here that turns the phrase above into concrete actions
  this.actualResult = testFunction(this.value)
})

Then('something should happen', function (expectedResult) {
  // Write code here that turns the phrase above into concrete actions
  assert.strictEqual(this.actualResult, expectedResult)
})
