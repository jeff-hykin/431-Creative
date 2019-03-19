import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import styles from './styles.sass'
import { colors } from '../theme'
import UserContext from '../user-context'
import Page from '../page'

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
  navigateToProfile = (e) => {
    /* istanbul ignore next */
    e.preventDefault()
    /* istanbul ignore next */
    this.props.history.push('/profile')
  }

  navigateToNewPosting = (e) => {
    e.preventDefault()
    this.props.history.push('/makeposting')
  }

  render () {
    return <div id='splashPage' className={this.props.className}>
      {/* Blue triangle */}
      <div className={this.props.classes.topRightMessage}>
        <h5 className={this.props.classes.topRightTitle} style={titleStyles}>Looking for a project?</h5>
        <div style={{ marginRight: offsetSides, marginTop: '1rem' }}>
          <UserContext.Consumer>
            {user => {
              /* istanbul ignore next */
              if (user == null) {
                return (
                  <a href='/auth/google'><Button id='loginButton' variant='outlined' className={this.props.classes.loginButton}>
                    Login
                  </Button></a>
                )
              } else {
                return (
                  <Button id='loginButton' variant='outlined' className={this.props.classes.loginButton} onClick={this.navigateToProfile}>
                    Profile
                  </Button>
                )
              }
            }}
          </UserContext.Consumer>
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
          <span>Make a Listing</span>
        </Button>
        <h5 className={this.props.classes.bottomLeftTitle} style={titleStyles}>Need Some Work Done?</h5>
      </div>
      <UserContext.Consumer>
        {user => {
          /* istanbul ignore next */
          if (user == null) {
            return (
              <a href='/auth/google'><Button id='loginButton' variant='outlined' className={this.props.classes.loginButton}>
                    Login
              </Button></a>
            )
          } else {
            return (
              <a href='/auth/google/logout'><Button id='loginButton' variant='outlined' className={this.props.classes.loginButton}>
                    Logout
              </Button></a>
            )
          }
        }}
      </UserContext.Consumer>
      <ToastContainer />
    </div>
  }
}

export default Page(withRouter(withStyles(classes)(SplashPage)))
