import 'regenerator-runtime/runtime'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { DIV } from 'good-dom'
import fetch from 'isomorphic-fetch'

import Routes from './routes'
import { style } from './theme'
import { HOST_AND_PROTOCOL } from '../backend/config'
import GlobalSnackbar from './components/snackbar'

// CSS for toast notifications
import 'react-toastify/dist/ReactToastify.min.css'

//
// set body
//
const reactContainer = new DIV({
  style: style.body
})
document.body.children = [
  reactContainer
]

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentWillMount () {
    this.authenticate()
    /* istanbul ignore else */
    if (localStorage.getItem('user') !== 'undefined' && localStorage.getItem('user') !== undefined) {
      /* istanbul ignore next */
      try {
        window.user = JSON.parse(localStorage.getItem('user'))
      } catch (e) /* istanbul ignore next */ {}
      /* istanbul ignore next */
      this.setState({ loading: false })
    }
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
        localStorage.setItem('user', JSON.stringify(data.user))
        window.user = data.user
      } else {
        console.log('NOT AUTHENTICATED')
        localStorage.setItem('user', undefined)
        window.user = undefined
      }
    } catch (err) /* istanbul ignore next */ {
      console.error('Ran into an issue checking authentication...', err)
    } finally {
      this.setState({ loading: false })
    }
  }

  render () {
    return <Fragment>
      <style>{'* { font-family: Roboto } '}</style>
      {
        this.state.loading
          ? <div />
          : <Routes />
      }
      <GlobalSnackbar />
    </Fragment>
  }
}

// put the pages inside the container
ReactDOM.render(React.createElement(App), reactContainer)
export default App
