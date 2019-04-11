const { Given, When, Then} = require('cucumber')
const { By, until } = require('selenium-webdriver')
const { expect } = require('chai')
const sleep = require('sleep')
const secrets = require('../../secrets.json')

Given(/^I am logged in$/, async function () {
  try {  
    await this.driver.get('http://localhost:3000')
    await this.driver.findElement(By.id('loginButton')).click()
    await this.driver.findElement(By.tagName('input')).sendKeys(secrets.tests.testemail)
    await this.driver.findElement(By.id('identifierNext')).click()
    let password = await this.driver.wait(until.elementLocated(By.css('[name=password]')), 5000)
    sleep.sleep(1)
    password.sendKeys(secrets.tests.testpass)
    await this.driver.findElement(By.id('passwordNext')).click()
    sleep.sleep(1)
  } catch (err) {
    console.log(err)
  }
})

Given(/^I add a post$/, async function() {
  try {
    await this.driver.get('http://localhost:3000/makeposting')
    await this.driver.findElement(By.id('title')).sendKeys('My Test Post')
    await this.driver.findElement(By.id('skill')).sendKeys('Test Skill')
    await this.driver.findElement(By.id('skillButton')).click()
    await this.driver.findElement(By.id('description')).sendKeys('This is my test description')
    await this.driver.findElement(By.id('postEmail')).sendKeys('tranquildusktest@gmail.com')
    await this.driver.findElement(By.id('company')).sendKeys('Texas A&M University')
    await this.driver.findElement(By.id('phone')).sendKeys('0000000000')
    await this.driver.findElement(By.id('linkedIn')).sendKeys('testLinkedIn')
    await this.driver.findElement(By.id('saveButton')).click()
  } catch (err) {
    console.log(err)
  }
})

Given(/^I am on my dashboard page$/, async function () {
  await this.driver.get('http://localhost:3000/dashboard')
})

When(/^I click the postings button$/, async function () {
  await this.driver.findElement(By.id('allposts')).click()
})

When(/^I click the logout button$/, async function () {
  await this.driver.findElement(By.id('login')).click()
})

Then(/^I can see posts by me$/, async function() {
  await this.driver.findElements(By.id('cardTitle')).then( async function (elems) {
    await elems.forEach(async function (element) {
      let text = await element.getText()
      expect(text).to.equal('My Test Post')
    })
  })
})