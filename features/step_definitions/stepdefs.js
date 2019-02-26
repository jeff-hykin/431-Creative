import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import './attach-jsdom'
import React from 'react'
import App from '../../client/main'
import expect from 'expect'
import { Given, Then } from 'cucumber'
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

Given('I am at a nonexistent URL', function () {
  // load a non existant URL
  history.push('/nonexistent')
  // mount the app with that URL
  global.screen = mount(<App />)
})

Then('I should see {string} on the page', function (string) {
  // get the page not found component
  let pageNotFoundComponent = global.screen.find('#page-not-found')
  // make sure it has the 404 error header
  expect(pageNotFoundComponent.contains([ <h2>404</h2> ]))
})
