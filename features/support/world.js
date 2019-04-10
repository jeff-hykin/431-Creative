const { setWorldConstructor, setDefaultTimeout } = require('cucumber')
const seleniumWebdriver = require('selenium-webdriver')

function CustomWorld () {
  this.driver = new seleniumWebdriver.Builder().forBrowser('chrome').build()
}

setWorldConstructor(CustomWorld)
setDefaultTimeout(60 * 1000)
// module.exports = function() {
//   this.World = CustomWorld
//
//   this.setDefaultTimeout(30*1000)
// }
