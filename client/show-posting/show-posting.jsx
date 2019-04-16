import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core'
import 'react-toastify/dist/ReactToastify.min.css'
import { api } from '../../backend/setup-functions'
import { colors } from '../theme'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import EmailIcon from '@material-ui/icons/EmailOutlined'
import BusinessIcon from '@material-ui/icons/BusinessOutlined'
import PhoneIcon from '@material-ui/icons/PhoneOutlined'
import PeopleIcon from '@material-ui/icons/PeopleOutlined'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import { Nav, NavLeft, NavRight, NavSpacer } from '../components/navbar'
import BigButton from '../components/big-button'
import LoginArea from '../components/login-area'
import { onClickNewPosting } from '../all-postings/all-postings'
import { sendSnackbarError } from '../components/snackbar'

/* istanbul ignore next */
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
    background: colors.blue,
    color: 'white'
  },
  cardHeader: {
    textAlign: 'center'
  }
})

class ShowPosting extends Component {
  constructor (props) {
    super(props)

    this.state = {
      post: null,
      loading: true
    }
  }

  async componentWillMount () {
    try {
      let post = (await api['get-postings']({ _id: this.props.match.params.id }))[0]
      /* istanbul ignore next */
      this.setState({ post, loading: false })
    } catch (err) {
      sendSnackbarError(err.toString())
      console.error(err)
    }
  }

  render () {
    localStorage.setItem('lastPage', window.location.pathname)
    const { history } = this.props
    /* istanbul ignore else */
    if (this.state.loading) {
      return <div>We are retrieving data</div>
    } else {
      return (
        <div id='show-post' style={{ width: '100%' }}>
          <Nav>
            <NavLeft>
              <BigButton id='postingsButton' isNav color='blue' onClick={e => history.push('/postings')}>
                All Posts
              </BigButton>
            </NavLeft>
            <NavRight>
              <NavSpacer />
              { window.user != null && <BigButton id='dashboardButton' isNav color='green' onClick={e => history.push('/dashboard')}>
                Dashboard
              </BigButton>}
              <NavSpacer />
              <LoginArea />
            </NavRight>
          </Nav>
          <section className={this.props.classes.root}>
            <Card className={this.props.classes.heroContent}>
              <CardHeader
                title={this.state.post.title}
                classes={{
                  title: this.props.classes.cardHeader
                }} />
              <CardContent>
                <Typography color='textPrimary' gutterBottom align='center'>
                  Job Information
                </Typography>
                <div>
                  <Typography color='textSecondary' gutterBottom>
                    Skills
                  </Typography>
                  { this.state.post.skills.map((item) => (
                    <Chip
                      label={item}
                      key={item}
                    />
                  ))}
                </div>
                <Typography color='textSecondary' gutterBottom>
                  Description
                </Typography>
                <div>
                  {this.state.post.description}
                </div>
                {/* CONTACT INFO */}
                <Typography color='textPrimary' gutterBottom align='center' className={this.props.classes.contactHeader}>
                  Contact Information
                </Typography>
                <List>
                  <Typography color='textSecondary' gutterBottom>
                    Email
                  </Typography>
                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={this.state.post.contactInfo.email || 'Not Available'}
                    />
                  </ListItem>
                  <Typography color='textSecondary' gutterBottom>
                    Name
                  </Typography>
                  <ListItem>
                    <ListItemIcon>
                      <BusinessIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={this.state.post.contactInfo.company || 'Not Available'}
                    />
                  </ListItem>
                  <Typography color='textSecondary' gutterBottom>
                    Phone
                  </Typography>
                  <ListItem>
                    <ListItemIcon>
                      <PhoneIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={this.state.post.contactInfo.phone || 'Not Available'}
                    />
                  </ListItem>
                </List>

              </CardContent>
            </Card>
          </section>
        </div>
      )
    }
  }
}

export { ShowPosting, classes }
export default withRouter(withStyles(classes)(ShowPosting))
