import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { withStyles } from '@material-ui/core'
import Transitioner from './transitioner'
import { DIV } from 'good-dom'
// pages
import SplashPage from './splash-page/splash-page'
import PageNotFound from './page-not-found/page-not-found'
import Postings from './postings/postings'

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
  pageNotLoaded: {},
  pageFullyLoaded: {}
}

// this is a wrapper for the route so that we dont have to write out "<Transitioner ..." for every single page
// transitioner adds page animations when the page is loaded
let Page = ({ path, component, routeProps, componentProps }) => <Route
  exact={path != null}
  path={path}
  component={() =>
    <Transitioner
      perisitantClassName={componentProps.classes.page}
      tranitions={[componentProps.classes.pageNotLoaded, 0, componentProps.classes.pageFullyLoaded]}
      component={component}
      componentProps={componentProps}
    />
  }
  {...routeProps}
/>

//
// Routes
//
let App = withStyles(classes)(props =>
  <BrowserRouter>
    {/* Pick which page to render */}
    <Switch>
      {Page({ componentProps: props, component: SplashPage, path: '/' })}
      <Page componentProps={props} component={Postings} path='/postings' />
      {Page({ componentProps: props, component: PageNotFound })}
    </Switch>
  </BrowserRouter>
)

// put the pages inside the container
ReactDOM.render(React.createElement(App), reactContainer)
export default App
