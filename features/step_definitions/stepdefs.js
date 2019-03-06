import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import './attach-jsdom'
import React from 'react'
import Routes from '../../client/routes'
import { expect } from 'chai'
import { Given, When, Then } from 'cucumber'
import { createBrowserHistory } from 'history'

// take all properties of the window object and also attach it to the mocha global object
// see why at:  https://jaketrent.com/post/testing-react-with-jsdom/
// original source: https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
for (let key in window) {
  if (!window.hasOwnProperty(key)) continue
  if (key in global) continue
  global[key] = window[key]
}
// create the enzyme adapter (just part of initiliziing things)
configure({ adapter: new Adapter() })
// create the history thats used to naviagte to different pages
const history = createBrowserHistory()

//
// Page Not Found
//
Given('I am at a nonexistent URL', function () {
  // load a non existant URL
  history.push('/nonexistent')
  // mount the app with that URL
  global.screen = mount(<Routes />)
})

Then('I should see {string} on the page', function (string) {
  // get the page not found component
  let pageNotFoundComponent = global.screen.find('#page-not-found')
  // make sure it has the 404 error header
  expect(pageNotFoundComponent.contains([ <h2>404</h2> ]))
})

//
// Splash Page
//
Given('I am on the splash page', function () {
  // load the homepage
  history.push('/')
  // mount the app with that URL
  global.screen = mount(<Routes />)
})

When('I click login', function () {
  global.screen.find({ id: 'loginButton' }).hostNodes().simulate('click')
})

// 2) Scenario: I click browse on the splash page
When('I click browse', function () {
  global.screen.find({ id: 'browseButton' }).hostNodes().simulate('click')
})

// 3) Scenario: I click create on the splash page
When('I click create', function () {
  global.screen.find({ id: 'createButton' }).hostNodes().simulate('click')
})

Then('the state is changed', function () {
  expect(global.screen.find({ id: 'splashPage' }))
})
