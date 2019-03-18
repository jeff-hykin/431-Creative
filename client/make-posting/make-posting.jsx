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
    backgroundColor: colors.gray
  },
  saveButton: {
    ...buttonStyles,
    color: colors.white,
    borderColor: colors.white,
    backgroundColor: colors.blue
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
    let temp = this.state
    temp[name] = event.target.value
    this.setState(temp)
  }

  handleCardName = num => event => {
    this.state.details[parseInt(num)].name = event.target.value
    this.setState(this.state)
  }

  handleCardDetail = num => event => {
    this.state.details[num].detail = event.target.value
    console.log(num)
    this.setState(this.state)
  }

  addCard = (e) => {
    const tind = this.state.details.length
    this.state.details = this.state.details.concat([{ name: '', detail: '', ind: tind }])
    this.setState(this.state)
  }

  savePosting = (e) => {
    api['make-posting'](this.state).then(response => { console.log(response) })
  }

  goHome = (e) => {
    e.preventDefault()
    this.props.history.push('/')
  }

  constructor (props) {
    super(props)
    this.state = { id: 0, details: [{ name: '', detail: '', ind: 0 }] }
  }

  render () {
    return <div id='makePosting' className={this.props.className} style={{ width: '100%' }}>
      <div className={this.props.classes.titleBar}>
        <Grid container spacing={0}>
          <Grid container item xs>
            <Button id='cancelButton' variant='outlined' className={this.props.classes.cancelButton} onClick={this.goHome}>
              Cancel
            </Button>
          </Grid>
          <Grid container item xs justify='flex-end'>
            <Button id='saveButton' variant='outlined' className={this.props.classes.saveButton} onClick={this.savePosting}>
              Save
            </Button>
          </Grid>
        </Grid>
        <TextField
          id='postTitle'
          label='Title'
          name='Title'
          className={this.props.classes.textField}
          value={this.state.title}
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
          { this.state.details.map((item) => (
            <Card className={classes.card} key={item.ind} id={item.name}>
              <CardContent>
                <TextField
                  id='detailName'
                  label='Detail'
                  name='Detail'
                  value={item.name}
                  onChange={this.handleCardName(item.ind)}
                  margin='normal'
                />
                <br />
                <TextField
                  id='filled-multiline-flexible'
                  label='Description'
                  multiline
                  rowsMax='12'
                  value={item.detail}
                  onChange={this.handleCardDetail(item.ind)}
                  className={classes.textField}
                  margin='normal'
                  variant='filled'
                />
              </CardContent>
            </Card>
          ))}
          <div className={this.props.classes.alignBottom}>
            <Fab color='secondary' aria-label='Add' className={classes.margin} onClick={this.addCard}>
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
                value={this.state.email}
                onChange={this.handleChange('email')}
                margin='normal'
              />
              <TextField
                id='post'
                label='Company'
                name='Title'
                className={this.props.classes.textField}
                value={this.state.company}
                onChange={this.handleChange('company')}
                margin='normal'
              />
              <TextField
                id='postName'
                label='Phone'
                name='Title'
                className={this.props.classes.textField}
                value={this.state.phone}
                onChange={this.handleChange('phone')}
                margin='normal'
              />
              <TextField
                id='postName'
                label='LinkedIn'
                name='Title'
                className={this.props.classes.textField}
                value={this.state.linkedin}
                onChange={this.handleChange('linkedin')}
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
