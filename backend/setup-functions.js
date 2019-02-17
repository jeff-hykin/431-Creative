//
// FIXME: change the res.send, and fetch() code so these functions actually work
//
module.exports.setupBackendFunctions = (app, subdomain = '') => {
  const fs = require('fs')
  const path = require('path')

  let includeAllFiles = (relativePath) => {
    var allFileContent = {}
    fs.readdirSync(relativePath).forEach(file => { allFileContent[file.replace(/(.+)\.js$/, '$1')] = require(path.join(__dirname, relativePath, file)) })
    return allFileContent
  }

  let backendFunctions = includeAllFiles('./backend/functions')
  for (let eachName in backendFunctions) {
    // create the route
    app.post(subdomain + '/' + eachName, async (req, res) => {
      try {
        // run the backend function with the arguments
        res.send(await backendFunctions[eachName](...req.body))
      } catch (error) {
        // send the error to the frontend
        res.send(400, JSON.stringify(error))
      }
    })
  }
}

module.exports.api = new Proxy({}, {
  get: (target, key) => async (...args) => {
    // get the value from the backend
    let response = await fetch('/backend/' + key, { body: args })
    if (response.code === 400) {
      // make the error catchable on the frontend
      throw JSON.parse(response.body)
    }
    return response.body
  }
})
