let dummyFunction = require('../backend/functions/dummyFunction')
let output = dummyFunction()
if (output !== 'This is a dummy function') {
  throw Error('dummyFunction failed test')
}
