import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import './attach-jsdom'
import React from 'react'
import App from '../../client/main'
import SplashPage from '../../client/splash-page/splash-page'
import assert from 'assert'
import { Given, When, Then } from 'cucumber'

// take all properties of the window object and also attach it to the mocha global object
// see why at:  https://jaketrent.com/post/testing-react-with-jsdom/
// original source: https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
for (let key in window) {
  if (!window.hasOwnProperty(key)) continue
  if (key in global) continue
  global[key] = window[key]
}

console.log(`window is:`, typeof window)
// let screen = mount(<App />)

// configure({ adapter: new Adapter() })

// // Given('I am on the splash page', function () {
// //   console.log(`window is:`, window)
// // })

// Given('I am at a nonexistent URL', function () {
//   console.log(`window is:`, window)
//   console.log(`document is:`, document)
//   console.log(`screen is:`, screen)
//   mount(<SplashPage />)
// })

// Then('Then I should see "404" on the page', function () {
//   console.log(`window is:`, window)
// })

// // When('I click create', function () {
// //   this.wrapper.find({ id: 'createButton' }).hostNodes().simulate('click')
// // })

// // When('I click login', function () {
// //   this.wrapper.find({ id: 'loginButton' }).hostNodes().simulate('click')
// // })

// // When('I click browse', function () {
// //   this.wrapper.find({ id: 'browseButton' }).hostNodes().simulate('click')
// // })

// // Then('the state is changed', function () {
// //   assert.strictEqual(this.wrapper.state('open'), 'true')
// // })
