import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import styles from './styles.sass'
import { colors } from '../theme'

let titleStyles = {
  fontSize: 'calc(2.4vw + 1rem)'
}
let buttonStyles = {
  borderRadius: '10rem',
  transform: 'scale(1.3)',
  zIndex: 100
}
let offsetSides = 'calc(5vw + 1rem)'
let buttonSideAdditionalOffset = '1.9rem'
let offsetBottomAndTop = '15vh'

export const classes = {
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
    // position: 'fixed',
    // top: '1.2rem',
    // right: '2rem',
    backgroundColor: colors.teal
  }
}

export default withStyles(classes)(class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    this.authenticate()
  }

  notify = () => {
    toast.success('You Clicked Something!', { position: toast.POSITION.BOTTOM_RIGHT })
  }

  authenticate () {
    fetch('/auth/google/authenticate', {
      mode: 'no-cors',
    }).then(res => {
      return res.json()
    }).then(data => {
      if(data.authenticated) {
        console.log('AUTHENTICATED')
        this.setState({ user: data.user })
      } else {
        console.log('NOT AUTHENTICATED')
      }
    }).catch(err => {
      console.error('Ran into an issue checking authentication...', err)
    })
  }

  render () {
    return <div id='splashPage' className={this.props.className}>
      {/* Blue triangle */}
      <div className={this.props.classes.topRightMessage}>
        <h5 className={this.props.classes.topRightTitle} style={titleStyles}>Looking for a project?</h5>
        <div style={{ marginRight: offsetSides, marginTop: '1rem' }}>
          <a href='/auth/google'><Button id='loginButton' variant='outlined' className={this.props.classes.loginButton}>
            Login
          </Button></a>
          <div style={{ width: '3rem' }} />
          <Button id='browseButton' className={this.props.classes.browseButton} onClick={this.notify}>
            <span>Browse Listings</span>
          </Button>
        </div>
        <div className={styles.primaryTriangle + ' ' + this.props.classes.blueBackground} />
      </div>
      {/* White */}
      <div className={this.props.classes.bottomLeftMessage}>
        <Button id='createButton' className={this.props.classes.createButton} onClick={this.notify}>
          <span>Make a Listing</span>
        </Button>
        <h5 className={this.props.classes.bottomLeftTitle} style={titleStyles}>Need Some Work Done?</h5>
      </div>
      <ToastContainer />
    </div>
  }
})
