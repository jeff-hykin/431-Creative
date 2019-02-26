import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

export const classes = {
  page: {
    flexDirection: 'column',
    transition: 'color 1500ms ease-in-out'
  },
  pageNotLoaded: {
    color: 'white'
  },
  pageFullyLoaded: {
    color: 'black'
  },
  blueTriangle: {
    backgroundColor: '#0288D1',
    width: '800vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: '50vw',
    filter: 'drop-shadow(0px 10px 5px rgba(0,0,0,0.4))',
    transform: 'skew(45deg, 0)',
    '&:hover': {
      // width: '150vw',
      // height: '150vh',
      // transform: 'translate(-5vw)',
      // transitionDuration: '.3s'
    }
  },
  triangleWhite: {
    backgroundColor: '#FFFFFF',
    top: '9vh',
    right: 0,
    position: 'fixed',
    marginRight: '1rem',
    flexDirection: 'column',
    marginLeft: '25vw',
    alignItems: 'flex-end',
    textAlign: 'right',
    '&:hover': {
      // width: '150vw',
      // height: '150vh',
      // transform: 'translate(-5vw)',
      // transitionDuration: '.3s'
    }
  },
  blue: {
    color: '#0288D1'
  },
  white: {
    color: '#FFFFFF'
  },
  whiteMessage: {
    top: '9vh',
    right: 0,
    position: 'fixed',
    marginRight: '1rem',
    flexDirection: 'column',
    marginLeft: '25vw',
    alignItems: 'flex-end',
    textAlign: 'right'
  },
  blueMessage: {
    bottom: '9vh',
    left: 0,
    position: 'fixed',
    marginLeft: '1rem',
    flexDirection: 'column',
    marginRight: '25vw',
    alignItems: 'flex-start',
    textAlign: 'left'
  },
  browseButton: {
    marginRight: '2rem',
    marginTop: '1rem',
    backgroundColor: '#FFFFFF'
  },
  createButton: {
    marginLeft: '2rem',
    marginTop: '1rem',
    backgroundColor: '#0288D1'
  },
  loginButton: {
    color: '#FFFFFF',
    borderColor: '#FFFFFF',
    top: '10px',
    right: '10px',
    position: 'fixed',
    '&:hover': {
      // backgroundColor: '#FFFFFF'
    }
  }
}

export default withStyles(classes)(class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }

  notify = () => {
    toast.success('You Clicked Something!', { position: toast.POSITION.BOTTOM_RIGHT })
  }

  render () {
    return <div id='splashPage' className={this.props.className}>
      <div className={this.props.classes.blueTriangle} />
      <div className={this.props.classes.whiteMessage}>
        <h5 className={this.props.classes.white}>Looking for a project?</h5>
        <Button id='browseButton' className={this.props.classes.browseButton} onClick={this.notify}>
          <span>Browse Listings</span>
        </Button>
      </div>
      <div className={this.props.classes.blueMessage}>
        <h5 className={this.props.classes.blue}>Need Some Work Done?</h5>
        <Button id='createButton' className={this.props.classes.createButton} onClick={this.notify}>
          <span className={this.props.classes.white}>Make a Listing</span>
        </Button>
      </div>
      <Button id='loginButton' variant='outlined' className={this.props.classes.loginButton} onClick={this.notify}>
        Login
      </Button>
      <ToastContainer />
    </div>
  }
})
