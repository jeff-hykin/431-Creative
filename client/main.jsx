import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SplashPage from './splashPage/index'
import NoMatch from './nomatch/index'

function App () {
  return (
    <div className='App'>
      <h1>Howdy</h1>
      <Switch>
        <Route exact path='/' component={SplashPage} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), rootElement)
