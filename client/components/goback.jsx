import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'

/* istanbul ignore next */
let GoBack = ({ history, match }) => {
  history.push(localStorage.getItem('lastPage'))
  return <Fragment />
}

export default withRouter(GoBack)
