import React from 'react'
import BigButton from './big-button'
import { withStyles } from '@material-ui/core'
import { colors } from '../theme'

export const classes = theme => ({
  loginButton: {
    color: colors.white,
    borderColor: colors.white,
    backgroundColor: colors.teal
  }
})

let onLogin = (e) => {
  localStorage.setItem('lastPage', window.location.pathname)
  window.location.href = '/auth/google'
}

let onLogout = (e) => {
  localStorage.setItem('lastPage', window.location.pathname)
  localStorage.removeItem('user')
  window.user = undefined
  window.location.href = '/auth/google/logout'
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
export default withStyles(classes)(LoginArea)
