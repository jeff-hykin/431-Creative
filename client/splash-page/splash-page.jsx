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
  triangle: {
    backgroundColor: colors.blue,
    width: '800vw',
    height: '116vh',
    position: 'fixed',
    left: '50vw',
    filter: 'drop-shadow(0px 10px 5px rgba(0,0,0,0.4))',
    transform: 'skew(45deg, 0)'
  },
  button: {
    ...buttonStyles,
    padding: '0.4rem 0.7rem',
    marginLeft: `calc(${buttonSideAdditionalOffset} + ${offsetSides})`,
    marginBottom: '1rem',
    marginRight: '1%',
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
  titleText: {
    textAlign: 'center',
    color: colors.blue
  },
  cards: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
  },
  alignCenter: {
    textAlign: 'center',
    color: colors.blue
  },
  contentCenter: {
    width: '100%',
    height: '100%',
    marginTop: '2%',
    marginBottom: '2%',
    alignContent: 'center',
    display: 'flex'
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
      <div className={this.props.classes.triangle} />
      { this.renderUserButton() }
      <div className={this.props.classes.cards}>
        <Card>
          <CardContent>
            <h2 className={this.props.classes.alignCenter}>
              Aggie Coding Connect
            </h2>
            <h6 className={this.props.classes.alignCenter}>
              Where Coders Find Projects
            </h6>
            <div className={this.props.classes.contentCenter}>
              <h5 className={this.props.classes.alignCenter}>
                Browse Job Postings
              </h5>
              <Button id='browseButton' className={this.props.classes.button} onClick={this.navigateToPostings}>
                <span>Browse Postings</span>
              </Button>
            </div>
            <div className={this.props.classes.contentCenter}>
              <h5 className={this.props.classes.alignCenter}>
                Create a Job Posting
              </h5>
              <Button id='createButton' className={this.props.classes.button} onClick={this.navigateToNewPosting}>
                <span>Make Posting</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <ToastContainer />
    </div>
  }
}

export default Page(withRouter(withStyles(classes)(SplashPage)))
