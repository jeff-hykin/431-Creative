import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Transitioner from './transitioner'
import { HEAD, BODY, TITLE, DIV, LINK, NOSCRIPT } from 'good-dom'
// pages
import SplashPage from './splashPage/index'
import NoMatch from './nomatch/index'
import { withStyles } from '@material-ui/core'

//
// set document head
//
document.head = new HEAD(
  new TITLE('ACC'),
  // stylesheets
  new LINK({ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500' }),
  new LINK({ rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }),
  new LINK({ rel: 'stylesheet', href: 'https://unpkg.com/css-baseline/css/super-1.css' })
)

//
// set body
//
let reactContainer = new DIV()
document.body = new BODY(
  new NOSCRIPT('You need to enable JavaScript to run this app.'),
  reactContainer
)

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
      <Page path='/' component={SplashPage} {...props} />
      <Page component={NoMatch} {...props} />
    </Switch>
  </BrowserRouter>
)

// put the pages inside the container
ReactDOM.render(React.createElement(App), reactContainer)
