import React, { Fragment } from 'react'
import BigButton from './big-button'
import { withStyles } from '@material-ui/core'
import { colors } from '../theme'
import { NavSpacer } from '../components/navbar'

export const classes = theme => ({
  loginButton: {
    color: colors.white,
    borderColor: colors.white,
    backgroundColor: colors.teal
  }
})

let redirectOnLogin = (e) => {
  /* istanbul ignore next */
  e.preventDefault()
  /* istanbul ignore next */
  this.props.history.push(window.location.pathname)
}

let onLogin = (e) => {
  window.location.href = '/auth/google'
}

let onLogout = (e) => {
  window.location.href = '/auth/google/logout'
  localStorage.removeItem('user')
  window.user = undefined
}

let LoginArea = ({ classes }) => {
  /* istanbul ignore next */
  if (window.user == null) {
    return <BigButton isNav color='green' onClick={onLogin}>
        Login
    </BigButton>
  } else {
    return <Fragment>
      <BigButton isNav color='green' onClick={redirectOnLogin}>
        Dashboard
      </BigButton>
      <NavSpacer />
      <BigButton isNav color='gray' id='logoutButton' onClick={onLogout}>
            Logout
      </BigButton>
    </Fragment>
  }
}

export default withStyles(classes)(LoginArea)
