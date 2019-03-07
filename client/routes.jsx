import 'regenerator-runtime/runtime'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// pages
import SplashPage from './splash-page/splash-page'
import PageNotFound from './page-not-found/page-not-found'
import Postings from './postings/postings'
import MakePosting from './make-posting/make-posting'
import theme from './theme'

//
// Routes
//
export default (props) =>
  <Router>
    {/* Pick which page to render */}
    <Switch>
      <Route component={SplashPage} path='/' exact />
      <Route component={Postings} path='/postings' exact />
      <Route component={MakePosting} path='/makeposting' exact />
      <Route component={PageNotFound} />
    </Switch>
  </Router>
