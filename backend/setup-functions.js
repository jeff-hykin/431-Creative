//
// FIXME: change the res.send, and fetch() code so these functions actually work
//

let subdomain = '/backend'
module.exports.setupBackendFunctions = (app) => {
  const fs = require('fs')
  const path = require('path')

  let includeAllFiles = (absolutePath) => {
    var allFileContent = {}
    fs.readdirSync(absolutePath).forEach(file => { allFileContent[file.replace(/(.+)\.js$/, '$1')] = require(path.join(absolutePath, file)) })
    return allFileContent
  }

  let backendFunctions = includeAllFiles(path.resolve('./backend/functions'))
  for (let eachName in backendFunctions) {
    // create the route
    app.post(subdomain + '/' + eachName, async (req, res) => {
      try {
        let output = await backendFunctions[eachName](req.user, ...req.body.args)
        // run the backend function with the arguments
        res.send({ output })
      } catch (error) {
        // send the error to the frontend
        res.send({ error: error.toString() })
      }
    })
  }
}

module.exports.api = new Proxy({}, {
  get: (target, key) => async (...args) => {
    return new Promise((resolve, reject) => {
      fetch(subdomain + '/' + key, {
        method: 'post',
        body: JSON.stringify({ args }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(async res => {
        let data = await res.json()
        if (data.output !== undefined) {
          resolve(data.output)
        } else {
          reject(data.error)
        }
      })
    })
  }
})
