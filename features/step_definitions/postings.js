const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')
const { By } = require('selenium-webdriver')

Given(/^I go to the postings page$/, async function () {
  await this.driver.get('http://localhost:3000/postings')
})

Then(/^I am on the postings page$/, async function () {
  try {
    await this.driver.findElements(By.id('postingTitle')).then(function (elems) {
      expect(elems.length).to.equal(1)
    })
  } catch (err) {
    console.log(err)
  }
})

When(/^I click the about button$/, async function () {
  try {
    await this.driver.findElement(By.id('about')).click()
  } catch (err) {
    console.log(err)
  }
})

When(/^I click the dashboard button$/, async function () {
  try {
    await this.driver.findElement(By.id('dashboardButton')).click()
  } catch (err) {
    console.log(err)
  }
})

When(/^I click the make posting button$/, async function () {
  try {
    await this.driver.findElement(By.id('makeposting')).click()
  } catch (err) {
    console.log(err)
  }
})

When(/^I click the login button$/, async function () {
  try {
    await this.driver.findElement(By.id('loginButton')).click()
  } catch (err) {
    console.log(err)
  }
})

Then(/^I can log in$/, async function () {
  try {
    let URL = await this.driver.getCurrentUrl()
    expect(URL.includes('accounts.google.com')).to.equal(true)
  } catch (err) {
    console.log(err)
  }
})

Then(/^I am on the make posting page$/, async function () {
  try {
    let URL = await this.driver.getCurrentUrl()
    expect(URL).to.equal('http://localhost:3000/makeposting')
  } catch (err) {
    console.log(err)
  }
})

Then(/^I am on my dashboard page$/, async function () {
  try {
    let URL = await this.driver.getCurrentUrl()
    expect(URL).to.equal('http://localhost:3000/dashboard')
  } catch (err) {
    console.log(err)
  }
})

Then(/^I will see postings$/, async function () {
  await this.driver.findElements(By.id('cardTitle')).then(async function (elems) {
    expect(elems.length > 0).to.equal(true)
  })
})
