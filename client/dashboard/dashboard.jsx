import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core'
import { colors } from '../theme'
import Lister from '../components/lister'
import UserList from '../components/userList'
import PostList from '../components/postList'
import { Nav, NavLeft, NavRight, NavSpacer } from '../components/navbar'
import { navigateToEditPosting, navigateToShowPosting, deletePosting, transformPostings } from '../components/lister/utils'
import Page from '../page'
import { api } from '../../backend/setup-functions'
import BigButton from '../components/big-button'
import LoginArea from '../components/login-area'
import ContactFields from '../components/contact-fields'
import * as tools from '../tools'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'

const classes = theme => ({
  dashboardName: {
    marginTop: '-20vh',
    marginLeft: '10vw',
    marginBottom: '7vh',
    color: colors.offWhite,
    display: 'flex'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap-reverse',
    justifyContent: 'center',
    paddingBottom: '2em'
  },
  tabBar: {
    colorDefault: colors.blue,
    colorPrimary: colors.blue,
    colorSecondary: colors.blue
  }
})

function TabContainer (props) {
  return (
    <Typography component='div' style={{ backgroundColor: colors.white, padding: 8 * 3 }}>
      {props.children}
    </Typography>
  )
}

class PostingsHelper extends Component {
  constructor (props) {
    super(props)
    this.state = {
      postings: []
    }
  }

  componentDidMount () {
    this.getPostings()
  }

  getPostings = () => {
    api['get-postings']({ ownerId: this.props.user._id }).then(resp => (
      this.setState({
        postings: transformPostings(resp, {
          showEdit: true,
          showView: true,
          showDelete: true,
          onEdit: navigateToEditPosting.bind(this, this.props.history),
          onDelete: deletePosting,
          onView: navigateToShowPosting.bind(this, this.props.history)
        })
      }))
    )
  }

  render () {
    return <Lister list={this.state.postings} user={this.props.user} />
  }
}

class TableHelper extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tab: 0
    }
  }

  switchTab = () => {
    let tempState = this.state
    if (tempState.tab === 0) { tempState.tab = 1 } else { tempState.tab = 0 }
    this.setState(tempState)
  }

  render () {
    return <div>
      <AppBar position='static' style={{ backgroundColor: colors.teal, color: colors.white }}>
        <Tabs value={this.state.tab} onChange={this.switchTab}>
          <Tab label='Posts' />
          <Tab label='Users' />
        </Tabs>
      </AppBar>
      {this.state.tab === 0 && <TabContainer><PostList history={this.props.history} /></TabContainer>}
      {this.state.tab === 1 && <TabContainer><UserList /></TabContainer>}
    </div>
  }
}

class AdminHelper extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    if (window.user.role === 'admin') {
      return <BigButton id='switchTable' size='medium' color='gray' variant='outlined' onClick={this.props.switchTab} >
        {this.props.tab}
      </BigButton>
    } else {
      return null
    }
  }
}

PostingsHelper.defaultProps = {
  user: {}
}

class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.handleChange = tools.setupHandleChange(this)
    this.state = {
      tab: 'Admin'
    }
  }

  navigateToPostings = (e) => {
    e.preventDefault()
    this.props.history.push('/postings')
  }

  switchTab = () => {
    let tempState = this.state
    if (tempState.tab === 'Account') {
      tempState.tab = 'Admin'
    } else {
      tempState.tab = 'Account'
    }
    this.setState(tempState)
  }

  navigateToNewPosting = e => {
    e.preventDefault()
    this.props.history.push('/makeposting')
  }

  render () {
    localStorage.setItem('lastPage', window.location.pathname)
    let user = window.user
    if (user == null) /* istanbul ignore next */ {
      return <Redirect to='/postings' />
    } else {
      return <div id='Dashboard' className={this.props.className}>
        <Nav banner>
          <NavLeft>
            <BigButton id='allposts' size='medium' color='gray' variant='outlined' onClick={this.navigateToPostings} >
              All Posts
            </BigButton>
            <NavSpacer />
            <BigButton id='makeposting' isNav size='medium' color='gray' variant='outlined' onClick={this.navigateToNewPosting}>
              Make Post
            </BigButton>
            <NavSpacer />
            <AdminHelper tab={this.state.tab} switchTab={this.switchTab} />
          </NavLeft>
          <NavRight>
            <LoginArea size='medium' variant='outlined' />
          </NavRight>
        </Nav>
        <h2 className={this.props.classes.dashboardName} >
          {user.firstName + ' ' + user.lastName}
        </h2>
        <div className={this.props.classes.container}>
          <div style={{ minWidth: '50vw', width: 'calc(50vw + 10em)' }} >
            {this.state.tab === 'Admin' && <PostingsHelper user={user} history={this.props.history} />}
            {this.state.tab === 'Account' && <TableHelper history={this.props.history} />}
          </div>
          <div style={{ padding: '3em', minWidth: '21em' }} >
            <ContactFields state={user} handleChange={this.handleChange} readOnly />
          </div>
        </div>
      </div>
    }
  }
}

export { Dashboard, classes }
export default Page(withRouter(withStyles(classes)(Dashboard)))
