import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core'
import { colors } from '../theme'
import Page from '../page'

const classes = theme => ({
  titleBar: {
    margin: 0,
    padding: 0,
    borderRadius: '2rem',
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingTop: '1%',
    paddingBottom: '1%',
    backgroundColor: colors.teal,
    width: '100vw',
    height: '20%'
  },
  profileName: {
    color: colors.white
  }
})

class ProfilePage extends Component {
  render () {
    return <div id='ProfilePage' className={this.props.className}>
      <div className={this.props.classes.titleBar}>
        <h5 className={this.props.classes.profileName} >Your Name</h5>
      </div>
    </div>
  }
}

export default Page(withStyles(classes)(ProfilePage))
