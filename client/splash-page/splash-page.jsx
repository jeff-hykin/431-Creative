import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import styles from './styles.sass'
import { colors } from '../theme'
import Page from '../page'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

const titleStyles = {
  fontSize: 'calc(2.4vw + 1rem)'
}
let buttonStyles = {
  borderRadius: '10rem',
  transform: 'scale(1.3)',
  zIndex: 100
}
const offsetSides = 'calc(5vw + 1rem)'
const buttonSideAdditionalOffset = '1.9rem'
const offsetBottomAndTop = '15vh'

export const classes = theme => ({
  bottomLeftTitle: {
    color: colors.blue,
    marginLeft: offsetSides
  },
  topRightTitle: {
    color: colors.white,
    marginRight: offsetSides
  },
  bottomLeftMessage: {
    bottom: offsetBottomAndTop,
    left: '0',
    position: 'fixed',
    flexDirection: 'column',
    marginRight: '25vw',
    alignItems: 'flex-start',
    textAlign: 'left'
  },
  topRightMessage: {
    top: offsetBottomAndTop,
    right: '0',
    position: 'fixed',
    flexDirection: 'column',
    marginLeft: '25vw',
    alignItems: 'flex-end',
    textAlign: 'right',
    zIndex: '10',
    [`&:hover .${styles.primaryTriangle}`]: {
      top: 0
    },
    [`&:not(:hover) .${styles.primaryTriangle}`]: {
      top: '-15vh'
    }
  },
  blueBackground: {
    backgroundColor: colors.blue
  },
  whiteBackground: {
    backgroundColor: colors.white
  },
  browseButton: {
    ...buttonStyles,
    padding: '0.4rem 0.7rem',
    marginRight: buttonSideAdditionalOffset,
    backgroundColor: colors.white,
    color: colors.blue,
    '&:hover': {
      color: colors.white
    }
  },
  createButton: {
    ...buttonStyles,
    padding: '0.4rem 0.7rem',
    marginLeft: `calc(${buttonSideAdditionalOffset} + ${offsetSides})`,
    marginBottom: '1rem',
    backgroundColor: colors.blue,
    color: colors.white,
    '&:hover': {
      color: colors.blue
    }
  },
  loginButton: {
    ...buttonStyles,
    color: colors.white,
    borderColor: colors.white,
    position: 'fixed',
    top: '1.2rem',
    right: '2rem',
    backgroundColor: colors.teal
  },
  title: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    zIndex: '100',
    borderColor: colors.blue,
    border: 'solid',
    borderWidth: '2dp',
    boxShadow: 'none',
    borderRadius: '30px'
  },
  titleText: {
    textAlign: 'center',
    color: colors.blue
  }
})

class SplashPage extends Component {
  notify = () => {
    toast.success('You Clicked Something!', { position: toast.POSITION.BOTTOM_RIGHT })
  }

  navigateToPostings = (e) => {
    e.preventDefault()
    this.props.history.push('/postings')
  }
  navigateToDashboard = (e) => {
    /* istanbul ignore next */
    e.preventDefault()
    /* istanbul ignore next */
    this.props.history.push('/dashboard')
  }

  navigateToNewPosting = (e) => {
    e.preventDefault()
    this.props.history.push('/makeposting')
  }

  renderUserButton () {
    /* istanbul ignore next */
    localStorage.setItem('lastPage', window.location.pathname)
    if (!window.user) {
      return (
        <a href='/auth/google'><Button id='loginButton' variant='outlined' className={this.props.classes.loginButton}>
            Login
        </Button></a>
      )
    } else {
      return (
        <Button id='loginButton' variant='outlined' className={this.props.classes.loginButton} onClick={this.navigateToDashboard}>
            Dashboard
        </Button>
      )
    }
  }

  render () {
    return <div id='splashPage' className={this.props.className}>
      <Card className={this.props.classes.title}>
        <CardContent>
          <h2 className={this.props.classes.titleText}>
            Aggie Coding Connect
          </h2>
          <h6 className={this.props.classes.titleText}>
            Where Coders Find Projects
          </h6>
        </CardContent>
      </Card>
      {/* Blue triangle */}
      <div className={this.props.classes.topRightMessage}>
        <h5 className={this.props.classes.topRightTitle} style={titleStyles}>
          Browse Job Postings
        </h5>
        <div style={{ marginRight: offsetSides, marginTop: '1rem' }}>
          { this.renderUserButton() }
          <div style={{ width: '3rem' }} />
          <Button id='browseButton' className={this.props.classes.browseButton} onClick={this.navigateToPostings}>
            <span>Browse Postings</span>
          </Button>
        </div>
        <div className={styles.primaryTriangle + ' ' + this.props.classes.blueBackground} />
      </div>
      {/* White */}
      <div className={this.props.classes.bottomLeftMessage}>
        <Button id='createButton' className={this.props.classes.createButton} onClick={this.navigateToNewPosting}>
          <span>Make Posting</span>
        </Button>
        <h5 className={this.props.classes.bottomLeftTitle} style={titleStyles}>Create a Job Posting</h5>
      </div>
      <ToastContainer />
    </div>
  }
}

export default Page(withRouter(withStyles(classes)(SplashPage)))
