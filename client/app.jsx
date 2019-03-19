import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { DIV } from 'good-dom'
import fetch from 'isomorphic-fetch'

import Routes from './routes'
import { classes } from './theme'
import { HOST_AND_PROTOCOL } from '../backend/config'

import UserContext from './user-context'

//
// set body
//
const reactContainer = new DIV({
  style: classes.body
})
document.body.children = [
  reactContainer
]

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null
    }
  }

  componentDidMount () {
    this.authenticate()
  }

  authenticate () {
    fetch(`${HOST_AND_PROTOCOL}/auth/google/authenticate`, {
      mode: 'no-cors'
    }).then(res => {
      return res.json()
    }).then(data => {
      /* istanbul ignore if */
      if (data.authenticated) {
        console.log('AUTHENTICATED')
        this.setState({ user: data.user })
      } else {
        console.log('NOT AUTHENTICATED')
      }
    }).catch(err => {
      console.error('Ran into an issue checking authentication...', err)
    })
  }

  render () {
    return (
      <UserContext.Provider value={this.state.user}>
        <Routes />
      </UserContext.Provider>
    )
  }
}

// put the pages inside the container
ReactDOM.render(React.createElement(App), reactContainer)
export default App
