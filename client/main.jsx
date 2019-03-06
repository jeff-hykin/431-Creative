import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { withStyles } from '@material-ui/core'
import { TITLE, DIV } from 'good-dom'
import fetch from 'isomorphic-fetch'
import { HOST_AND_PROTOCOL } from '../backend/config'
// pages
import SplashPage from './splash-page/splash-page'
import PageNotFound from './page-not-found/page-not-found'

//
// set document head
//
document.head.add(
  new TITLE('ACC')
)

//
// set body
//
let reactContainer = new DIV()
document.body.children = [
  reactContainer
]

//
// Page styles
//
export const classes = {
  page: {
    flexDirection: 'column'
  },
  pageNotLoaded: {
  },
  pageFullyLoaded: {
  }
}

// this is a wrapper for the route so that we dont have to write out "<Transitioner ..." for every single page
// transitioner adds page animations when the page is loaded
const Page = ({ path, component, routeProps, componentProps }) => <Route
  exact={path != null}
  path={path}
  component={component}
  {...routeProps}
/>

//
// UserContext Definition
//
export const UserContext = React.createContext(null)

//
// Routes
//
let App = withStyles(classes)(class extends React.Component {
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
      <BrowserRouter>
        {/* Pick which page to render */}
        <UserContext.Provider value={this.state.user}>
          <Switch>
            {Page({ componentProps: this.props, component: SplashPage, path: '/' }) }
            {Page({ componentProps: this.props, component: PageNotFound }) }
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    )
  }
})

// put the pages inside the container
ReactDOM.render(React.createElement(App), reactContainer)
export default App
