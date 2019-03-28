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
      loading: true,
      user: null
    }
  }

  async componentWillMount () {
    await this.authenticate()
  }

  async authenticate () {
    try {
      let res = await fetch(`${HOST_AND_PROTOCOL}/auth/google/authenticate`, {
        mode: 'no-cors'
      })
      let data = await res.json()

      /* istanbul ignore if */
      if (data.authenticated) {
        console.log('AUTHENTICATED')
        this.setState({ user: data.user, loading: false })
      } else {
        console.log('NOT AUTHENTICATED')
        this.setState({ loading: false })
      }
    } catch (err) {
      console.error('Ran into an issue checking authentication...', err)
      this.setState({ loading: false })
    }
  }

  render () {
    return this.state.loading
      ? <div />
      : <UserContext.Provider value={this.state.user}>
        <Routes />
      </UserContext.Provider>
  }
}

// put the pages inside the container
ReactDOM.render(React.createElement(App), reactContainer)
export default App
