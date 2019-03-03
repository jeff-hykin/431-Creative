import 'regenerator-runtime/runtime'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
// pages
import SplashPage from './splash-page/splash-page'
import PageNotFound from './page-not-found/page-not-found'
import Postings from './postings/postings'
import theme from './theme'

//
// Site theme
//
const themeContext = createMuiTheme(theme)

//
// Routes
//
const App = props => (
  <MuiThemeProvider theme={themeContext}>
    <Router>
      {/* Pick which page to render */}
      <Switch>
        <Route component={SplashPage} path='/' exact />
        <Route component={Postings} path='/postings' exact />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  </MuiThemeProvider>
)

export default App
