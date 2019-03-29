import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core'
import 'react-toastify/dist/ReactToastify.min.css'
import { colors } from '../theme'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Chip from '@material-ui/core/Chip'
import Navbar from '../components/navbar'
import { api } from '../../backend/setup-functions'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Snackbar from '@material-ui/core/Snackbar'

let buttonStyles = {
  borderRadius: '10rem',
  transform: 'scale(1.3)',
  zIndex: 100
}

const classes = theme => ({
  root: {
    backgroundColor: colors.offWhite,
    width: '100vw',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    marginTop: 50
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto 24px auto'
  },
  appBar: {
    position: 'relative',
    background: '#2096F3',
    color: 'white'
  },
  inputFields: {
    margin: '4px',
    display: 'block'
  },
  contactHeader: {
    marginTop: '12px'
  },
  skillInput: {
    display: 'flex',
    alignItems: 'center'
  },
  description: {
    marginTop: '12px'
  },
  snackBarError: {
    background: '#d32f2f'
  },
  saveButton: {
    background: '#2fd32f',
    color: 'white'
  },
  cancelButton: {
    background: '#d32f2f',
    color: 'white'
  }
})

class MakePosting extends Component {
  handleChange = name => event => {
    let temp = this.state
    temp[name] = event.target.value
    this.setState(temp)
  }

  handleContactChange = name => event => {
    let temp = this.state
    temp.contact[name] = event.target.value
    this.setState(temp)
  }

  handleSkillDelete = skill => () => {
    let temp = this.state
    let index = temp.skills.indexOf(skill)
    if (index !== -1) {
      temp.skills.splice(index, 1)
    }
    this.setState(temp)
  }

  handleSkillSnackBarClose = () => {
    this.setState({ skillSnackBarOpen: false })
  }

  handleErrorSnackBarClose = () => {
    this.setState({ errorSnackBarOpen: false })
  }

  /* istanbul ignore next */
  savePosting = (e) => {
    /* istanbul ignore next */
    let newPost = {}
    /* istanbul ignore next */
    newPost.title = this.state.title
    /* istanbul ignore next */
    newPost.description = this.state.description
    /* istanbul ignore next */
    newPost.contactInfo = JSON.stringify(this.state.contact)
    /* istanbul ignore next */
    newPost.skills = this.state.skills
    /* istanbul ignore next */
    api['make-posting'](newPost).then(response => {
      console.log(response)
      this.props.history.push('/dashboard') 
    }).catch(err => {
      let msg
      if(err.toString() === 'Error: missing post parameters') msg = 'Missing Form Fields'
      if(err.toString() === 'Error: not authorized') msg = 'You need to be logged in'
      this.setState({ errorSnackBarOpen: true, errorMsg: msg })
      console.error(err)
    })
  }

  addSkill = (e) => {
    let temp = this.state
    if (temp.newSkill !== '' && !(temp.skills.includes(temp.newSkill))) {
      temp.skills.push(temp.newSkill)
      temp.newSkill = ''
      this.setState(temp)
    } else {
      this.setState({ skillSnackBarOpen: true })
    }
  }

  goHome = (e) => {
    e.preventDefault()
    this.props.history.push('/')
  }

  constructor (props) {
    super(props)
    this.state = { title: '', description: '', skills: [], contact: {}, newSkill: '', skillSnackBarOpen: false, errorSnackBarOpen: false, errorMsg: '' }
  }

  render () {

    return <div id='makePosting' className={this.props.className} style={{ width: '100%' }}>

      <CssBaseline />
      <Navbar title='Make a Post' />
      <section className={this.props.classes.root}>
        <Card className={this.props.classes.heroContent}>
          <CardHeader title='Make a Post' />
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Post Information
            </Typography>
            <TextField
              id='title'
              placeholder='Title'
              value={this.state.title}
              label='Post Title' 
              onChange={this.handleChange('title')}
              className={this.props.classes.inputFields} />
            <div>
              <div className={this.props.classes.skillInput}>
                <TextField
                  id='skill'
                  placeholder='Skills'
                  className={this.props.classes.inputFields}
                  value={this.state.newSkill}
                  onChange={this.handleChange('newSkill')}
                  label='Add a Skill'
                />
                <Button id='skillButton' variant='outlined' onClick={this.addSkill} className={this.props.inputFields}>
                  Add Skill
                </Button>
              </div>
              <div>
                { this.state.skills.map((item) => (
                  <Chip
                    label={item}
                    key={item}
                    onDelete={this.handleSkillDelete(item)}
                  />
                ))}
              </div>
            </div>
            <TextField
              multiline
              className={this.props.classes.description}
              value={this.state.description}
              onChange={this.handleChange('description')}
              placeholder='description'
              rows='15'
              variant='outlined'
              fullWidth
              label='Job Description'
            />
            {/* CONTACT INFO */}
            <Typography color="textSecondary" gutterBottom className={this.props.classes.contactHeader}>
              Post Contact Information
            </Typography>
            <TextField
              id='postEmail'
              label='Email'
              name='Email'
              className={this.props.classes.inputFields}
              value={this.state.email}
              onChange={this.handleContactChange('email')}
            />
            <TextField
              id='post'
              label='Company'
              name='Title'
              className={this.props.classes.inputFields}
              value={this.state.company}
              onChange={this.handleContactChange('company')}
            />
            <TextField
              id='postName'
              label='Phone'
              name='Title'
              className={this.props.classes.inputFields}
              value={this.state.phone}
              onChange={this.handleContactChange('phone')}
            />
            <TextField
              id='postName'
              label='LinkedIn'
              name='Title'
              className={this.props.classes.inputFields}
              value={this.state.linkedin}
              onChange={this.handleContactChange('linkedin')}
            />
          </CardContent>
          <CardActions>
            <Button id='cancelButton' variant='outlined' onClick={this.goHome}
              classes={{
                root: this.props.classes.cancelButton
              }}>
              Cancel
            </Button>
            <Button id='saveButton' variant='outlined' onClick={this.savePosting}
              classes={{
                root: this.props.classes.saveButton
              }}>
              Save
            </Button>
          </CardActions>
        </Card>
      </section>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={this.state.skillSnackBarOpen}
        onClose={this.handleSkillSnackBarClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Skill is empty or already exists</span>}
        autoHideDuration={2000}
      />

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={this.state.errorSnackBarOpen}
        onClose={this.handleErrorSnackBarClose}
        ContentProps={{
          classes: {
            root: this.props.classes.snackBarError
          },
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.state.errorMsg}</span>}
        autoHideDuration={2000}
      />  
      
    </div>
  }
}

export { MakePosting, classes }
export default withRouter(withStyles(classes)(MakePosting))
