// import { shallow } from 'enzyme'
let shallow = require('enzyme')
// import React from 'react'
let React = require('react')
// import SplashPage from '../client/splash-page/splash-page'
let SplashPage = '../client/splash-page/splash-page'
const assert = require('assert')
const { Given, When, Then } = require('cucumber')

// EXAMPLE 1
Given('I am on the splash page', function () {
  this.wrapper = shallow(<SplashPage />)
})

// EXAMPLE 2
When('I click create', function (callback) {
  this.wrapper.find('#createButton').simulate('click')
})

// EXAMPLE 6
Then('the state is changed', function () {
  assert.strictEqual(this.wrapper.state('open'), 'true')
})
