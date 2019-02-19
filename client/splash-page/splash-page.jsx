import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import CloseIcon from '@material-ui/icons/Close'
import green from '@material-ui/core/colors/green'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
})

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          Congrats! You clicked something...
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}
MySnackbarContent.propTypes = {
	  classes: PropTypes.object.isRequired,
	  className: PropTypes.string,
	  message: PropTypes.node,
	  onClose: PropTypes.func,
	  variant: PropTypes.oneOf(['success']).isRequired,
};

export const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

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
  triangleMaroon: {
		zIndex: '0',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    background: '#500000',
    clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
    '&:hover': {
			//width: '150vw',
			//height: '150vh',
			//transform: 'translate(-5vw)',
			//transitionDuration: '.3s'
    }
  },
  triangleWhite: {
		zIndex: '0',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    background: '#FFFFFF',
    clipPath: 'polygon(0 0, 0% 100%, 100% 100%)',
    '&:hover': {
			//width: '150vw',
			//height: '150vh',
			//transform: 'translate(-5vw)',
			//transitionDuration: '.3s'
    }
  },
  mainDiv: {
    position: 'fixed',
    top: '0',
    right: '0'
  },
  loginText: {
		color: '#FFFFFF',
  },
  loginButton: {
		//color: '#FFFFFF',
		//backgroundColor: '#FFFFFF',
		//'&:hover': {
		//  backgroundColor: '#FFFFFF'
		//}
  },
  topRight: {
		zIndex: '1',
    position: 'fixed',
    top: '25vh',
    right: '25vh'
  },
  bottomLeft: {
		zIndex: '1',
    position: 'fixed',
    bottom: '25vh',
    left: '25vh'
  },
  maroon: {
    color: '#500000'
  },
  white: {
    color: '#FFFFFF'
  },
  maxWidth: {
    width: '100vw'
  },
  hideOver: {
    overflow: 'hidden'
  },
  shapeShadow: {
    position: 'fixed',
    top: '0',
    left: '0',
    filter: 'drop-shadow(0px 10px 5px rgba(0,0,0,0.2))'
	},
}

export default withStyles(classes)(class extends React.Component {
  constructor (props) {
    super(props)
		this.state = {
			open: false,
		}
  }

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };
  // <div className={this.props.classes.triangleWhite} />
  render () {
    return <div className={this.props.className}>
      <div className={this.props.classes.hideOver}>
				<div className={this.props.classes.shapeShadow}>
          <div className={this.props.classes.triangleMaroon} />
        </div>
        <div className={this.props.classes.topRight}>
         	<h1 className={this.props.classes.white} onClick={this.handleClick}>Looking for a project? </h1>
      	</div>
        <div className={this.props.classes.bottomLeft} onClick={this.handleClick}>
          <h1 className={this.props.classes.maroon}>Looking for coders? </h1>
        </div>
				<div className={this.props.classes.mainDiv}>
					<Button variant="outlined" color="primary" onClick={this.handleClick} className={this.props.classes.loginButton}>
						<span className={this.props.classes.loginText}>Login</span>
					</Button>
				</div>
      </div>
			<Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant="success"
            message="This is a success message!"
          />
        </Snackbar>
    </div>
  }
})
