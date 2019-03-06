import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { colors } from '../theme'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import { api } from '../../backend/setup-functions'

let buttonStyles = {
  borderRadius: '10rem',
  transform: 'scale(1.3)',
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
    height: '22vh'
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
    backgroundColor: colors.gray,
  },
  saveButton: {
    ...buttonStyles,
    color: colors.white,
    borderColor: colors.white,
    backgroundColor: colors.blue,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    fontSize: 'calc(2.4vw + 1rem)'
  },
  content: {
    width: '100%',
    height: '78vh',
    display: 'flex',
    paddingTop: '1rem',
    backgroundColor: '#fbf7f5'
  },
  cards: {
    width: '70%',
    paddingLeft: '3%',
    display: 'flex',
    flexWrap: 'wrap'
  },
  contacts: {
    width: '30%',
    paddingLeft: '3%',
    paddingRight: '3%'
  },
  bigFont: {
    fontSize: 'calc(2.4vw + 1rem)'
  },
  alignBottom: {
    display: 'flex',
    flexDirection: 'column-reverse',
    padding: '1rem'
  }
})

class MakePosting extends Component {
	handleChange = name => event => {
	  //this.props.({ [name]: event.target.value });
	}

	savePosting = {
		api['make-posting'](this.props.post).then(ret => {console.log(ret)})
	}

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
	        id='postTitle'
      label='Title'
      name='Title'
	        className={this.props.classes.textField}
	        value={this.props.title}
	        InputProps={{
        	  classes: {
  						input: this.props.classes.textField
	          }
	        }}
	        onChange={this.handleChange('name')}
	        margin='normal'
	      />
	    </div>
  		<div className={this.props.classes.content}>
    <div className={this.props.classes.cards} id='cards'>
  <Card className={classes.card}>
	          <CardContent>
	            <TextField
	              id='detailName'
    label='Detail'
    name='Detail'
	              value={this.props.name}
    onChange={this.handleChange('Detail')}
	              margin='normal'
	            />
      <br />
      <TextField
	              id='filled-multiline-flexible'
	              label='Multiline'
	              multiline
	              rowsMax='4'
	              value={this.props.multiline}
	              onChange={this.handleChange('m')}
	              className={classes.textField}
	              margin='normal'
	              helperText='hello'
	              variant='filled'
        			/>
    </CardContent>
	        </Card>
  <div className={this.props.classes.alignBottom}>
  <Fab color='secondary' aria-label='Add' className={classes.margin}>
  <AddIcon />
	          </Fab>
	        </div>
	      </div>
    <div className={this.props.classes.contacts}>
  <Card className={classes.card}>
	          <CardContent>
      <div className={this.props.classes.bigFont}>
								Contact Info
	            </div>
      <hr />
	            <TextField
	              id='postEmail'
    label='Email'
    name='Email'
	              className={this.props.classes.textField}
	              value={this.props.name}
	              onChange={this.handleChange('name')}
	              margin='normal'
	            />
	            <TextField
	              id='post'
    label='Company'
    name='Title'
	              className={this.props.classes.textField}
	              value={this.props.name}
	              onChange={this.handleChange('name')}
	              margin='normal'
	            />
	            <TextField
	              id='postName'
    label='Phone'
    name='Title'
	              className={this.props.classes.textField}
	              value={this.props.name}
	              onChange={this.handleChange('name')}
	              margin='normal'
	            />
	            <TextField
	              id='postName'
    label='LinkedIn'
    name='Title'
	              className={this.props.classes.textField}
	              value={this.props.name}
	              onChange={this.handleChange('name')}
	              margin='normal'
	            />
    </CardContent>
	        </Card>
	      </div>
	    </div>
	  </div>
	}
}

export default withRouter(withStyles(classes)(MakePosting))
