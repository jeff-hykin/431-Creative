import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core'
// import { makeStyles } from '@material-ui/styles'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import CloseIcon from '@material-ui/icons/Close'
import green from '@material-ui/core/colors/green'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const styles1 = theme => ({
  success: {
    backgroundColor: green[600]
  }
})

function MySnackbarContent (props) {
  const { classes, className, message, onClose, variant, ...other } = props

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby='client-snackbar'
      message={
        <span id='client-snackbar' className={classes.message}>
          Congrats! You clicked something...
        </span>
      }
      action={[
        <IconButton
          key='close'
          aria-label='Close'
          color='inherit'
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  )
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success']).isRequired
}

export const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent)

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
  maroonTriangle: {
    backgroundColor: '#500000',
    width: '800vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: '50vw',
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
  maroon: {
    color: '#500000'
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
  maroonMessage: {
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
    backgroundColor: '#500000'
  },
  loginButton: {
    color: '#FFFFFF',
    borderColor: '#FFFFFF',
    top: 0,
    right: 0,
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

  handleClick = () => {
    this.setState({ open: true })
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    this.setState({ open: false })
  };

  render () {
    return <div className={this.props.className}>
      <div className={this.props.classes.maroonTriangle} />
      <div className={this.props.classes.whiteMessage}>
        <h5 className={this.props.classes.white}>Looking for a project?</h5>
        <Button className={this.props.classes.browseButton} onClick={this.handleClick}>
          <span>Browse Listings</span>
        </Button>
      </div>
      <div className={this.props.classes.maroonMessage}>
        <h5 style={{ color: '#500000' }}>Need Some Work Done?</h5>
        <Button className={this.props.classes.createButton} onClick={this.handleClick}>
          <span className={this.props.classes.white}>Make a Listing</span>
        </Button>
      </div>
      <Button variant='outlined' className={this.props.classes.loginButton} onClick={this.handleClick}>
        Login
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={this.state.open}
        autoHideDuration={6000}
        onClose={this.handleClose}
      >
        <MySnackbarContentWrapper
          onClose={this.handleClose}
          variant='success'
          message='This is a success message!'
        />
      </Snackbar>
    </div>
  }
})
