import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core'
import 'react-toastify/dist/ReactToastify.min.css'
import { colors } from '../theme'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import Chip from '@material-ui/core/Chip'
import { api } from '../../backend/setup-functions'

let buttonStyles = {
  borderRadius: '10rem',
  transform: 'scale(1.3)',
  zIndex: 100
}

const classes = theme => ({
  titleBar: {
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingTop: '1%',
    paddingBottom: '1%',
    backgroundColor: colors.blue,
    width: '100%',
    display: 'flex'
    // height: '22vh'
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
    borderColor: colors.white,
    backgroundColor: colors.red
  },
  saveButton: {
    ...buttonStyles,
    color: colors.white,
    borderColor: colors.white,
    backgroundColor: colors.teal,
    float: 'right'
  },
  addSkill: {
    ...buttonStyles,
    color: colors.white,
    borderColor: colors.white,
    backgroundColor: colors.teal,
    marginRight: '2%',
    marginLeft: '2%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    fontSize: 'calc(2.4vw + 1rem)',
    color: colors.white
  },
  titleUnderline: {
    '&:after': {
      borderBottomColor: colors.white
    },
    '&:before': {
      borderBottomColor: colors.white
    }
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
    flexWrap: 'wrap',
    height: '100%',
    overflow: 'auto'
  },
  contacts: {
    width: '30%',
    height: '100%',
    paddingLeft: '3%',
    paddingRight: '3%'
  },
  bigFont: {
    fontSize: 'calc(2.2vw + 1rem)'
  },
  alignBottom: {
    display: 'flex',
    flexDirection: 'column-reverse',
    padding: '1rem'
  },
  card: {
    height: '98%',
    width: '98%'
  },
  skillsCard: {
    height: '10%',
    width: '100%',
    paddingTop: '1%'
  },
  descriptionCard: {
    height: '86%',
    width: '100%',
    paddingTop: '1%',
    paddingBottom: '1%'
  },
  contactsCard: {
    height: '99%'
  },
  submitContainer: {
    flexBasis: '0',
    flexGrow: '1',
    width: '10%'
  },
  cancelContainer: {
    flexBasis: '0',
    flexGrow: '1',
    width: '10%'
  },
  titleContainer: {
    flexBasis: '0',
    flexGrow: '1',
    justifyContent: 'center',
    width: '80%'
  },
  chipsBar: {
    display: 'flex'
  },
  description: {
    width: '100%',
    height: '100%'
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
    if (index != -1) {
      temp.skills.splice(index,1)
    }
    this.setState(temp)
  }

  /* istanbul ignore next */
  savePosting = (e) => {
    /* istanbul ignore next */
    let newPost         = {}
    newPost.title       = this.state.title
    newPost.description = this.state.description
    newPost.contactInfo = JSON.stringify(this.state.contact)
    newPost.skills      = JSON.stringify(this.state.skills)
    api['make-posting'](newPost).then(response => { console.log(response) })
  }

  addSkill = (e) => {
    let temp = this.state
    if (temp.newSkill != '') {
      temp.skills.push(temp.newSkill)
      temp.newSkill = ''
      this.setState(temp)
    }
  }

  goHome = (e) => {
    e.preventDefault()
    this.props.history.push('/')
  }

  constructor (props) {
    super(props)
    this.state = { title: '', description: '', skills: [], contact: {}, newSkill: ''}
  }

  render () {
    return <div id='makePosting' className={this.props.className} style={{ width: '100%' }}>
      <div className={this.props.classes.titleBar}>
        <div className={this.props.classes.cancelContainer}>
          <Button id='cancelButton' variant='outlined' className={this.props.classes.cancelButton} onClick={this.goHome}>
            Cancel
          </Button>
        </div>
        <div className={this.props.classes.titleContainer}>
          <TextField
            id='postTitle'
            placeholder='Title'
            value={this.state.title}
            InputProps={{
              classes: {
                underline: this.props.classes.titleUnderline,
                input: this.props.classes.textField
              }
            }}
            onChange={this.handleChange('title')}
            margin='normal'
          />
        </div>
        <div className={this.props.classes.submitContainer}>
          <Button id='saveButton' variant='outlined' className={this.props.classes.saveButton} onClick={this.savePosting}>
            Save
          </Button>
        </div>
      </div>
      <div className={this.props.classes.content}>
        <div className={this.props.classes.cards} id='cards'>
          <Card className={this.props.classes.skillsCard}>
            <CardContent className={this.props.classes.chipsBar}>
              <TextField
                id="skill"
                placeholder= 'Skills'
                className={classes.textField}
                value={this.state.newSkill}
                onChange={this.handleChange('newSkill')}
              />
              <Button id='skillButton' variant='outlined' className={this.props.classes.addSkill} onClick={this.addSkill}>
                Add Skill
              </Button>
              <div> 
                { this.state.skills.map((item) => (
                  <Chip
                    label={item}
                    key={item}
                    onDelete={this.handleSkillDelete(item)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className={this.props.classes.descriptionCard}>
            <CardContent>
              <div className={this.props.classes.bigFont}>
                Description
              </div>
              <TextField
                multiline
                className={this.props.classes.description}
                value={this.state.description}
                onChange={this.handleChange('description')}
                placeholder="description"
                rows="15"
                variant='outlined'
              />
            </CardContent>
          </Card>
        </div>
        <div className={this.props.classes.contacts}>
          <Card className={this.props.classes.contactsCard}>
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
                value={this.state.email}
                onChange={this.handleContactChange('email')}
                margin='normal'
              />
              <TextField
                id='post'
                label='Company'
                name='Title'
                className={this.props.classes.textField}
                value={this.state.company}
                onChange={this.handleContactChange('company')}
                margin='normal'
              />
              <TextField
                id='postName'
                label='Phone'
                name='Title'
                className={this.props.classes.textField}
                value={this.state.phone}
                onChange={this.handleContactChange('phone')}
                margin='normal'
              />
              <TextField
                id='postName'
                label='LinkedIn'
                name='Title'
                className={this.props.classes.textField}
                value={this.state.linkedin}
                onChange={this.handleContactChange('linkedin')}
                margin='normal'
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  }
}

export { MakePosting, classes }
export default withRouter(withStyles(classes)(MakePosting))
