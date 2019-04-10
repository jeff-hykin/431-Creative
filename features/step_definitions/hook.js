const { After, Before } = require('cucumber')

Before(function () {
  this.driver.user = {
    email: 'test@gmail.com',
    firstName: 'Test',
    lastName: 'Smith'
  }
})

After(function () {
  return this.driver.quit()
})
