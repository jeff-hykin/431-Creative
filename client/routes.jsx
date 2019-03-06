import 'regenerator-runtime/runtime'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Page from './page'

// pages
import SplashPage from './splash-page/splash-page'
import PageNotFound from './page-not-found/page-not-found'
import Postings from './postings/postings'

//
// Routes
//
export default (props) =>
  <Router>
    {/* Pick which page to render */}
    <Switch>
      <Route component={Page(SplashPage)} path='/' exact />
      <Route component={Page(Postings)} path='/postings' exact />
      <Route component={Page(PageNotFound)} />
    </Switch>
  </Router>
