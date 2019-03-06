import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core'
import { colors } from '../theme'
import Grid from '@material-ui/core/Grid'
import Posting from '../postings/posting'
import Page from '../page'

const classes = theme => ({
  titleBar: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 0,
    borderRadius: '2rem',
    padding: 10,
    paddingBottom: 60,
    backgroundColor: colors.teal,
    width: '100vw',
    height: '20%'
  },
  profileName: {
    color: colors.white,
    margin: 10,
    width: '100vw'
  },
  leftButton: {
    marginRight: 'auto',
    height: 40,
    margin: 10,
    borderRadius: '2rem',
    color: colors.white,
    borderColor: colors.white,
    backgroundColor: colors.blue
  },
  rightButton: {
    height: 40,
    margin: 10,
    borderRadius: '2rem',
    color: colors.white,
    borderColor: colors.white,
    backgroundColor: colors.blue
  },
  container: {
    display: 'flex'
  },
  postings: {
    padding: 40,
    flexShrink: 1
  }
})

class ProfilePage extends Component {
  navigateToPostings = (e) => {
    e.preventDefault()
    this.props.history.push('/postings')
  }

  render () {
    return <div id='ProfilePage' className={this.props.className}>
      <div className={this.props.classes.titleBar}>
        <Button id='allposts' variant='outlined' className={this.props.classes.leftButton} onClick={this.navigateToPostings}>
            All Posts
        </Button>
        <Button id='myposts' variant='outlined' className={this.props.classes.rightButton}>
            My postings
        </Button>
        <Button id='loginButton' variant='outlined' className={this.props.classes.rightButton}>
            Logout
        </Button>
        <h3 className={this.props.classes.profileName} >Your Name</h3>
      </div>

      <div className={this.props.classes.container}>
        <div className={this.props.classes.postings}>
          <Grid
            container
            direction='column'
            margin={5}
            justify='center'
            alignItems='left'
            spacing={40}
          >
            <Grid item>
              <Posting />
            </Grid>
            <Grid item>
              <Posting />
            </Grid>
          </Grid>
        </div>
        <h1>
          User info...
        </h1>
      </div>
    </div>
  }
}

export default Page(withRouter(withStyles(classes)(ProfilePage)))
