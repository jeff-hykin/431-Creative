import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { DIV } from 'good-dom'

import App from './routes'

//
// set body
//
const reactContainer = new DIV()
document.body.children = [
  reactContainer
]

// put the pages inside the container
ReactDOM.render(React.createElement(App), reactContainer)
