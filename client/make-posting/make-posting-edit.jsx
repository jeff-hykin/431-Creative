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
import Chip from '@material-ui/core/Chip'
import Navbar from '../components/navbar'
import { api } from '../../backend/setup-functions'
import CssBaseline from '@material-ui/core/CssBaseline'

let buttonStyles = {
  borderRadius: '10rem',
  transform: 'scale(1.3)',
  zIndex: 100
}

const classes = theme => ({
  addSkill: {
    ...buttonStyles,
    color: colors.white,
    borderColor: colors.white,
    backgroundColor: colors.teal,
    marginRight: '2%',
    marginLeft: '2%'
  },
  content: {
    width: '100%',
    height: '78vh',
    display: 'flex',
    paddingTop: '1rem',
    backgroundColor: colors.offWhite
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
  skills: {
    height: '15%',
    width: '100%',
    paddingTop: '1%'
  },
  contactsCard: {
    height: '99%'
  },
  titleContainer: {
    flexBasis: '0',
    flexGrow: '1',
    justifyContent: 'center',
    width: '80%'
  },
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
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  appBar: {
    position: 'relative',
    background: '#2096F3',
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
    api['make-posting'](newPost).then(response => { console.log(response) })
  }

  addSkill = (e) => {
    let temp = this.state
    if (temp.newSkill !== '') {
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
    this.state = { title: '', description: '', skills: [], contact: {}, newSkill: '' }
  }

  render () {
    return <div id='makePosting' className={this.props.className} style={{ width: '100%' }}>

      <CssBaseline />
      <Navbar title='Make a Post' />
      <section className={this.props.classes.root}>
        <Card className={this.props.classes.heroContent}>
          <CardContent>
            <TextField
              id='title'
              placeholder='Title'
              value={this.state.title} />
            <div id='skills-add'>
              <TextField
                id='skill'
                placeholder='Skills'
                className={classes.textField}
                value={this.state.newSkill}
                onChange={this.handleChange('newSkill')}
              />
              <Button id='skillButton' variant='outlined' classesonClick={this.addSkill}>
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
            </div>
            <TextField
              multiline
              className={this.props.classes.description}
              value={this.state.description}
              onChange={this.handleChange('description')}
              placeholder='description'
              rows='15'
              variant='outlined'
            />
          </CardContent>
          <CardActions>
            <Button id='cancelButton' variant='outlined' className={this.props.classes.cancelButton} onClick={this.goHome}>
              Cancel
            </Button>
            <Button id='saveButton' variant='outlined' className={this.props.classes.saveButton} onClick={this.savePosting}>
              Save
            </Button>
          </CardActions>
        </Card>
      </section>
    </div>
  }
}

export { MakePosting, classes }
export default withRouter(withStyles(classes)(MakePosting))
