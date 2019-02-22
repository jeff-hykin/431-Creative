import { configure, mount } from 'enzyme'
import Snackbar from '@material-ui/core/Snackbar'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import SplashPage from '../../client/splash-page/splash-page'
const assert = require('assert')
const { Given, When, Then } = require('cucumber')
const { JSDOM } = require('jsdom')
const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const { window } = jsdom
global.window = window
global.document = window.document

configure({ adapter: new Adapter() })

Given('I am on the splash page', function () {
  this.wrapper = mount(<SplashPage />)
})

When('I click create', function (callback) {
  this.wrapper.find({ id: 'createButton' }).hostNodes().simulate('click')
})

When('I click login', function () {
  this.wrapper.find({ id: 'loginButton' }).hostNodes().simulate('click')
})

When('I click browse', function () {
  this.wrapper.find({ id: 'browseButton' }).hostNodes().simulate('click')
})

Then('the state is changed', function () {
  assert.strictEqual(this.wrapper.find(Snackbar).props('open'), 'true')
})

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
