import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { DIV } from 'good-dom'

import Routes from './routes'
import { classes } from './theme'

//
// set body
//
const reactContainer = new DIV({
  style: classes.body
})
document.body.children = [
  reactContainer
]

let App = (props) =>
  <React.Fragment>
    <Routes />
  </React.Fragment>

// put the pages inside the container
ReactDOM.render(React.createElement(App), reactContainer)
