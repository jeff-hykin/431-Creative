// setup file
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'babel-polyfill'
const { JSDOM } = require('jsdom')

const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
let { window } = jsdom
function copyProps (src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target)
  })
}

//
// Unpack Window
//
// There is a bunch of code here because its basically unpacking and re-packing the window object so that the window properties can be modified for testing
// for example the localStorage property throws an error everytime you try to set or get it, so it can't be overriden without unpacking/repacking the object
// the reason there is so much code is because some things need to be copied by reference and other things need to be shallow copied
let newWindow = {}
let thingsToSkip = [ 'localStorage', 'sessionStorage' ]
let thingsToAssignByReference = [ 'navigator', 'document', 'window', 'self', 'parent', 'frames', 'top', '_globalProxy', '_top', '_parent', 'ActiveXObject', 'XMLHttpRequest', 'HTMLIFrameElement' ]
function copyFromWindow (each) {
  if (thingsToSkip.includes(each)) {
    return
  }
  let eachAttribute = window[each]
  // assign by reference
  if (eachAttribute instanceof Function || !(eachAttribute instanceof Object) || thingsToAssignByReference.includes(each)) {
    newWindow[each] = eachAttribute
  // shallow copy
  } else {
    newWindow[each] = { ...eachAttribute }
    for (let eachProperty in Object.getOwnPropertyDescriptors(eachAttribute)) {
      newWindow[each][eachProperty] = eachAttribute[eachProperty]
    }
  }
}
for (let each in window) {
  copyFromWindow(each)
}
for (let each in Object.getOwnPropertyDescriptors(window)) {
  copyFromWindow(each)
}
window = newWindow

//
// Custom Injections
//
// if there's something on the window object you want to mock/change do it here

// mock localStorage
global.pseudoLocalStorage = {}
window.localStorage = {
  getItem: (key) => {
    return global.pseudoLocalStorage[key]
  },
  setItem: (key, value) => {
    global.pseudoLocalStorage[key] = `${value}`
  },
  removeItem: (key) => {
    delete global.pseudoLocalStorage[key]
  }
}

// mock href
let actualHref = ''
window.location = {}
Object.defineProperty(window.location, 'href', {
  get () { return actualHref },
  set (newValue) { actualHref = newValue }
})

//
// Copy window properties to global
//
global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js'
}
global.requestAnimationFrame = function (callback) {
  return setTimeout(callback, 0)
}
global.cancelAnimationFrame = function (id) {
  clearTimeout(id)
}

copyProps(window, global)

configure({ adapter: new Adapter() })
