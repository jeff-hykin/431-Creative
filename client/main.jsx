import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Transitioner from './transitioner'
import { TITLE, DIV, NOSCRIPT } from 'good-dom'
// pages
import SplashPage from './splash-page/splash-page'
import PageNotFound from './page-not-found/page-not-found'
import { withStyles } from '@material-ui/core'

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
  new NOSCRIPT('You need to enable JavaScript to run this app.'),
  reactContainer
]

//
// Page styles
//
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

let Page = ({ path, component, classes, ...otherProps }) => <Route
  exact={path != null}
  path={path}
  component={() =>
    <Transitioner
      perisitantClassName={classes.page}
      tranitions={[classes.pageNotLoaded, 0, classes.pageFullyLoaded]}
      component={component}
      otherProps={otherProps}
    />
  }
/>

//
// Routes
//
let App = withStyles(classes)(props =>
  <BrowserRouter>
    {/* Pick which page to render */}
    <Switch>
      <Page {...props} component={SplashPage} path='/' />
      <Page {...props} component={PageNotFound} />
    </Switch>
  </BrowserRouter>
)

// put the pages inside the container
ReactDOM.render(React.createElement(App), reactContainer)
