import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Transitioner from './transitioner'
// pages
import SplashPage from './splashPage/index'
import NoMatch from './nomatch/index'
import { withStyles } from '@material-ui/core'

export const classes = {
  page: {
    flexDirection: 'column',
    transition: 'color 1500ms ease-in-out'
  },
  pageNotLoaded: {
    color: 'white'
  },
  pageFullyLoaded: {
    color: 'black'
  }
}

let App = withStyles(classes)(({ classes }) =>
  <React.Fragment>
    {/* standardize the style across browsers */}
    <link rel='stylesheet' href='https://unpkg.com/css-baseline/css/super-1.css' />
    {/* Pick which page to render */}
    <Switch>
      {/* SplashPage */}
      <Route
        exact
        path='/'
        component={() =>
          <Transitioner
            perisitantClassName={classes.page}
            tranitions={[classes.pageNotLoaded, 0, classes.pageFullyLoaded]}
            component={SplashPage}
          />
        }
      />
      {/* 404 error page */}
      <Route component={NoMatch} />
    </Switch>
  </React.Fragment>
)

const rootElement = document.getElementById('root')
ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), rootElement)
