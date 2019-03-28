import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/styles'
import UserContext from '../user-context'
import { Avatar } from '@material-ui/core'

const styles = theme => ({
  appBar: {
    position: 'relative',
    background: '#2096F3',
    color: 'white'
  },
  avatar: {
    backgroundColor: '#f36e20'
  },
  toolbarTitle: {
    flex: 1
  }
})

class Navbar extends Component {
  render () {
    const { classes } = this.props
    const user = this.context
    return (
      <AppBar position='static' color='default' className={classes.appBar}>
        <Toolbar>
          <Typography variant='h6' color='inherit' noWrap className={classes.toolbarTitle}>
            ACC
          </Typography>
          {user === null && <a href='/auth/google'><Button id='loginButton' variant='outlined' className={classes.loginButton}>
            Login
          </Button></a>}
          {user !== null && <Avatar className={classes.avatar}>
            {user.firstName[0]}
          </Avatar>}
        </Toolbar>
      </AppBar>
    )
  }
}

Navbar.contextType = UserContext

export default withStyles(styles)(Navbar)
