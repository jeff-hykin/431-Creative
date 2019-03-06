import 'regenerator-runtime/runtime'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// pages
import SplashPage from './splash-page/splash-page'
import ProfilePage from './profile-page/profile-page'
import PageNotFound from './page-not-found/page-not-found'
import Postings from './postings/postings'

//
// Routes
//
const App = props => (
  <Router>
    {/* Pick which page to render */}
    <Switch>
      <Route component={SplashPage} path='/' exact />
      <Route component={Postings} path='/postings' exact />
      <Route component={ProfilePage} path='/profile' exact />
      <Route component={PageNotFound} />
    </Switch>
  </Router>
)

export default App
