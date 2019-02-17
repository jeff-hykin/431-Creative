module.exports = async (data) => {
  if (Math.random() > 0.5) {
    throw Error('50% of the time im an error')
  }
  return 'This is a dummy function' + JSON.stringify(data)
}

// example frontend usage:
// import { api } from '../../backend/setup-functions'

// (async () => {
//   try {
//     console.log(`api['dummy-function'] is:`, await api['dummy-function']())
//   } catch (e) {
//     console.log(`e is:`, e)
//   }
// })()
