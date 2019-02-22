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
