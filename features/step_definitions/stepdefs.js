import { configure, mount } from 'enzyme'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import SplashPage from '../../client/splash-page/splash-page'
import assert from 'assert'
import { Given, When, Then } from 'cucumber'
import fs from 'fs'
import { JSDOM } from 'jsdom'
const jsdom = new JSDOM(fs.readFileSync('./client/index.html').toString('utf8'))
const { window } = jsdom
// see https://airbnb.io/enzyme/docs/guides/jsdom.html for more info
// for some reason enzye reccomends global variables
global.window = window
global.document = window.document

configure({ adapter: new Adapter() })

Given('I am on the splash page', function () {
  this.wrapper = mount(<SplashPage />)
})

When('I click create', function () {
  this.wrapper.find({ id: 'createButton' }).hostNodes().simulate('click')
})

When('I click login', function () {
  this.wrapper.find({ id: 'loginButton' }).hostNodes().simulate('click')
})

When('I click browse', function () {
  this.wrapper.find({ id: 'browseButton' }).hostNodes().simulate('click')
})

Then('the state is changed', function () {
  assert.strictEqual(this.wrapper.state('open'), 'true')
})
