// express app here

let app = {}
let { setupBackendFunctions } = require('./backend/setupFunctions')

setupBackendFunctions(app, '/backend')
