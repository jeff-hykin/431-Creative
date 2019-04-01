import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'

let GoBack = ({ history, match }) => {
  history.go(-Number(match.params.amount))
  return <Fragment />
}

export default withRouter(GoBack)
