import fs from 'fs'
import { JSDOM } from 'jsdom'
const url = 'http://localhost'
// see https://airbnb.io/enzyme/docs/guides/jsdom.html for more info
// for some reason enzye reccomends global variables
global.dom = new JSDOM(fs.readFileSync('./client/index.html').toString('utf8'), { url })
global.window = global.dom.window
global.document = global.dom.window.document
global.navigator = global.window.navigator
