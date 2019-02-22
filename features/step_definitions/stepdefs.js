const assert = require('assert')
const { Given, When, Then } = require('cucumber')

// you can declare functions in here but it is better practice
// to move these to somewhere else
function testAsyncFunction (value) {
  return new Promise(resolve => {
    if (value) {
      setTimeout(resolve, 100) // pass
    } else {
      setTimeout(resolve, 6000) // if this function evaluates to false,
    } // it will fail the test due to it taking longer than 5 seconds
  })
}

function testCallBacks (value) {
  return new Promise(resolve => {
    if (value) {
      resolve() // test will return passed
    } else {
      resolve('error') // test will return failed
    }
  })
}
// EXAMPLE 1
Given('I am on the splash page', function () {
  this.onPage = true
  // this will pass because the function completes without any output or stalls
})

// EXAMPLE 2
When('I try to click button1', function (callback) {
  this.clickButton1 = true
  if (this.clickButton1) {
    callback() // pass
  } else {
    var e = 'error'
    callback(e) // fail
  }
  // this will pass because it outputs an empty callback meaning there was no error
})

// EXAMPLE 3
When('I try to click button2', function () {
  this.clickButton2 = true
  return testAsyncFunction(this.clickButton2)
  // this will pass because it returns a promise that completes within 5
  // seconds, it will fail otherwise
})

// EXAMPLE 4
When('I try to click button3', function (callback) {
  this.clickButton3 = true
  testCallBacks(this.clickButton3).then(callback)
  // this will pass if the testCallBacks promise calls callback()
  // this will fail if the testCalBack promise calls callback('error code')
})

// EXAMPLE 5
When('I try to click button4', function () {
  this.clickButton4 = true
  return testAsyncFunction(this.clickButton4).then(() => {
    this.delayed = 'a value'
  })
  // this will pass because it returns a promise that completes within 5
  // seconds, it will fail otherwise,
  // the delayed value gets assigned BEFORE the next function
})

// EXAMPLE 6
Then('something should happen', function () {
  assert.strictEqual(this.delayed, 'a value')
  // this will pass because the delayed value is assigned by a previous 'when' function
  // order of function calls(each will complete): given->when->then
  // if any fails then the rest are skipped
})
