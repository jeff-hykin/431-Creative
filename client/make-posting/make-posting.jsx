import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { colors } from '../theme'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

let buttonStyles = {
  borderRadius: '10rem',
  // transform: 'scale(1.3)',
  zIndex: 100
}

export const classes = theme => ({
  titleBar: {
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingTop: '1%',
    paddingBottom: '1%',
    backgroundColor: colors.teal,
    width: '100%',
    height: '20%'
  },
  rightAlign: {
	  justifyContent: 'right'
  },
  flexInline: {
    display: 'inline-flex'
  },
  cancelButton: {
    ...buttonStyles,
    color: colors.white,
    borderColor: colors.gray,
    backgroundColor: colors.gray
  },
  saveButton: {
    ...buttonStyles,
    color: colors.white,
    borderColor: colors.white,
    backgroundColor: colors.teal
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
    fontSize: 'calc(2.4vw + 1rem)'
	},
	content: {
		paddingLeft: '3%',
		paddingRight: '3%'
	},
})

class MakePosting extends Component {
	handleChange = name => event => {
	  // this.setState({ [name]: event.target.value });
	};

	render () {
	  return <div id='makePosting' className={this.props.className}>
      <div className={this.props.classes.titleBar}>
        <Grid container spacing={0}>
          <Grid container item xs>
	          <Button id='cancelButton' variant='outlined' className={this.props.classes.cancelButton}>
              Cancel
            </Button>
	        </Grid>
          <Grid container item xs justify='flex-end'>
	          <Button id='saveButton' variant='outlined' className={this.props.classes.saveButton}>
              Save
            </Button>
	        </Grid>
				</Grid>
        <TextField
	        id='postName'
          name='Title'
	        className={this.props.classes.textField}
	        value={this.props.name}
	        onChange={this.handleChange('name')}
          margin='normal'
	      />
	    </div>
			<div className={this.props.classes.content}>
			  
			</div>
	  </div>
	}
}

export default withRouter(withStyles(classes)(MakePosting))
