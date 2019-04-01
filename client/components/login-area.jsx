import React, { Fragment } from 'react'
import BigButton from './big-button'
import { withStyles } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { colors } from '../theme'
import { NavSpacer } from '../components/navbar'

export const classes = theme => ({
  loginButton: {
    color: colors.white,
    borderColor: colors.white,
    backgroundColor: colors.teal
  }
})

let onLogin = (e) => {
  window.location.href = '/auth/google'
}

let onLogout = (e) => {
  window.location.href = '/auth/google/logout'
  localStorage.removeItem('user')
  window.user = undefined
}

let LoginArea = ({ classes, history, ...otherProps }) => {
  if (window.user == null) {
    return <BigButton id='loginButton' isNav color='green' onClick={onLogin} {...otherProps}>
        Login
    </BigButton>
  } else {
    return <BigButton id='logoutButton' isNav color='gray' onClick={onLogout} {...otherProps}>
        Logout
    </BigButton>
  }
}

export { LoginArea }
export default withRouter(withStyles(classes)(LoginArea))
