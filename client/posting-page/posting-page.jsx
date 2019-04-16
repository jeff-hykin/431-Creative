import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core'
import 'react-toastify/dist/ReactToastify.min.css'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import Chip from '@material-ui/core/Chip'
import { api } from '../../backend/setup-functions'
import BigButton from '../components/big-button'
import Button from '@material-ui/core/Button'
import ContactFields from '../components/contact-fields'
import { sendSnackbarMessage, sendSnackbarError } from '../components/snackbar'
import { setupHandleChange } from '../tools'
import { withLastLocation } from 'react-router-last-location'

/* istanbul ignore next */
const classes = theme => ({
  heroContent: {
    maxWidth: 600,
    minWidth: '60%',
    margin: '10vh 0 0 0'
  },
  skillButton: {
    borderRadius: '100vh'
  },
  description: {
    marginTop: '12px'
  },
  titleInputContainer: {
    paddingBottom: '2em'
  },
  titleInput: {
    fontSize: '2.3em',
    lineHeight: '1em'
  }
})

class PostingPage extends Component {
  constructor (props) {
    super(props)
    this.handleChange = setupHandleChange(this)
    this.state = {
      post: {
        loading: true,
        title: '',
        description: '',
        skills: [],
        contactInfo: {
          email: window?.user?.email,
          company: window?.user?.firstName + ' ' + window?.user?.lastName,
          phone: window?.user?.phone
        }
      },
      newSkill: ''
    }
  }

  /* istanbul ignore next */
  async componentWillMount () {
    // if the id exists, then get the data
    let postId = this.props.match?.params?.id
    if (postId) {
      // check if edit or view
      let currentPath = window.location.pathname.replace(/^\/(.+?)\/.+/, '$1')
      if (currentPath === 'editposting') {
        this.mode = 'edit'
      } else {
        this.mode = 'view'
      }
      try {
        let post = (await api['get-postings']({ _id: postId }))[0]
        console.log(`post is:`, post)
        /* istanbul ignore next */
        this.setState({ post, loading: false })
      } catch (err) {
        console.error(err)
      }
    // if not getting data from the backend, then theres no loading time
    } else {
      this.setState({ loading: false })
      this.mode = 'new'
    }
  }

  handleContactChange = name => e => {
    e.persist && e.persist()
    this.setState(prevState => ({ ...prevState, post: { ...prevState.post, contactInfo: { ...prevState.post.contactInfo, [name]: e.target.value } } }))
  }

  handleSkillDelete = skill => () => {
    console.log(`this.state.post is:`, this.state.post)
    let index = this.state.post.skills.indexOf(skill)
    /* istanbul ignore else */
    if (index !== -1) {
      this.setState(prevState => {
        prevState.post.skills.splice(index, 1)
        return ({ ...prevState, post: { ...prevState.post, skills: [...prevState.post.skills] } })
      })
    }
  }

  /* istanbul ignore next */
  savePosting = (e) => {
    /* istanbul ignore next */
    api['make-posting'](this.state.post, this.state.post._id).then(response => {
      sendSnackbarMessage('INFO: posting will auto-delete in 30 days')
      this.goBack(e)
    }).catch(err => {
      let msg
      if (err.toString() === 'Error: missing post parameters') msg = 'Missing Form Fields'
      if (err.toString() === 'Error: not authorized') msg = 'You need to be logged in'
      sendSnackbarError(msg)
      console.error(err)
    })
  }

  goBack = (e) => {
    if (this.props.lastLocation === null) {
      this.props.history.push('/postings')
    } else {
      this.props.history.goBack()
    }
  }

  addSkill = (e) => {
    if (this.state.newSkill !== '' && !(this.state.post.skills.includes(this.state.newSkill))) {
      this.setState(prevState => ({
        ...prevState,
        newSkill: '',
        post: {
          ...prevState.post,
          skills: [ ...prevState.post.skills, prevState.newSkill ]
        }
      }))
    } else /* istanbul ignore next */ {
      sendSnackbarMessage('Skill is empty or already exists')
    }
  }

  render () {
    let user = window.user
    if (user == null) /* istanbul ignore next */ {
      window.location.href = '/auth/google'
      return <div />
    }
    let classes = this.props.classes
    return <div id='makePosting' className={this.props.className} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Card className={this.props.classes.heroContent}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 'calc(1em + 2vw)' }} >
          <TextField
            id='title'
            placeholder='Title'
            value={this.state.post.title}
            onChange={this.handleChange(['post', 'title'])}
            className={classes.titleInputContainer}
            InputProps={{
              classes: {
                input: classes.titleInput
              }
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '2em' }}>
              <TextField
                id='skill'
                placeholder='Skills'
                value={this.state.newSkill}
                onChange={this.handleChange('newSkill')}
                label='Skills Needed'
                variant='outlined'
              />
              <div style={{ width: '1em' }} />
              <Button size='large' id='skillButton' style={{ borderRadius: '100vh' }} variant='outlined' onClick={this.addSkill}>
                <span style={{ minWidth: 'max-content' }} >
                  Add Skill
                </span>
              </Button>
            </div>
            <div>
              { this.state.post.skills.map((item) => <span style={{ paddingRight: '0.5em' }}>
                <Chip
                  label={item}
                  key={Math.random()}
                  onDelete={this.handleSkillDelete(item)}
                />
              </span>
              )}
            </div>
          </div>
          <TextField
            id='description'
            multiline
            className={this.props.classes.description}
            value={this.state.post.description}
            onChange={this.handleChange(['post', 'description'])}
            placeholder='description'
            rows='15'
            variant='outlined'
            fullWidth
            label='Job Description'
          />
          <div style={{ height: '2rem' }} />
          {/* CONTACT INFO */}
          <ContactFields state={this.state.post.contactInfo} handleChange={this.handleContactChange} />
          {/* Save and Cancel buttons */}
          <div style={{ paddingTop: '4em', display: 'flex' }}>
            <BigButton color='gray' id='cancelButton' onClick={this.goBack}>
                Cancel
            </BigButton>
            <div style={{ width: '2em' }} />
            <BigButton color='green' id='saveButton' onClick={this.savePosting}>
                Save
            </BigButton>
          </div>
        </div>
      </Card>
    </div>
  }
}

export { PostingPage, classes }
export default withRouter(withLastLocation(withStyles(classes)(PostingPage)))
