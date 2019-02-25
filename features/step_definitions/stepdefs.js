import { assert } from 'chai'
import Zombie from 'zombie'
import { Given, Then } from 'cucumber'
const NONEXISTENT_URL = 'http://localhost:3000/doesnotexist'
const browser = new Zombie()

Given(/^I am at a nonexistent URL$/, function (callback) {
  return browser.visit(NONEXISTENT_URL, callback)
})

Then(/^I should see "(.*)" on the page$/, function (phrase) {
  let headerTag = browser.html('h2')
  assert(headerTag === `<h2>${phrase}</h2>`, 'no h2 tag found with 404')
})
