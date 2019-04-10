const { Given, When } = require('cucumber')
const { By, elementLocated } = require('selenium-webdriver')
const sleep = require('sleep')
const passport = require('passport')

Given(/^I am logged in$/, async function () {
  // let strategy = passport._strategies['session']

  // strategy._token_response = {
  //   access_token: '1234',
  //   expires_in: 3600
  // }

  // strategy._profile = {
  //   id: '1234',
  //   provider: 'google',
  //   emails: [ { value: 'test@gmail.com', verified: true } ],
  //   displayName: 'Test Smith',
  //   name: { familyName: 'Smith', givenName: 'Test' }
  // }

  // this.driver.get('localhost:3000/auth/google', next)
  //   this.driver.user = {
  //     email: 'test@gmail.com',
  //     firstName: 'Test',
  //     lastName: 'Smith'
  //   }
  this.driver.get('http://localhost:3000')
  await this.driver.findElement(By.id('loginButton')).click()
  await this.driver.findElement(By.tagName('input')).sendKeys('INSERTEMAILHERE')
  await this.driver.findElement(By.id('identifierNext')).click()
  this.driver.wait(elementLocated(By.name('password')), 1000).then( el => {
    return el.sendKeys('INSERTPASSWORDHERE')
  })
  await this.driver.findElement(By.id('passwordNext')).click()
})

Given(/^I am on my dashboard page$/, function () {
  this.driver.get('http://localhost:3000/dashboard')
})

When(/^I click the postings button$/, function () {
  this.driver.findElement(By.id('allposts')).click()
})

When(/^I click the logout button$/, function () {
  this.driver.findElement(By.id('login')).click()
})
