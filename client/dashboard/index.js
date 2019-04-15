import React, { Component } from 'react'
import Page from '../page'
import DashboardHelper from './dashboard'
import { withRouter, Redirect } from 'react-router-dom'
import * as tools from '../tools'

class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.handleChange = tools.setupHandleChange(this)
  }

  render () {
    localStorage.setItem('lastPage', window.location.pathname)
    let user = window.user
    if (user == null) /* istanbul ignore next */ {
      return <Redirect to='/postings' />
    } else {
      return <DashboardHelper history={this.props.history} user={user} />
    }
  }
}

export default Page(withRouter(Dashboard))
