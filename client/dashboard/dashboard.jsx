import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core'
import { colors } from '../theme'
import Lister from '../components/lister'
import { Nav, NavLeft, NavRight } from '../components/navbar'
import { navigateToEditPosting, navigateToShowPosting, deletePosting, transformPostings } from '../components/lister/utils'
import Page from '../page'
import { api } from '../../backend/setup-functions'
import BigButton from '../components/big-button'
import LoginArea from '../components/login-area'
import ContactFields from '../components/contact-fields'
import * as tools from '../tools'

const classes = theme => ({
  dashboardName: {
    marginTop: '-20vh',
    marginLeft: '10vw',
    marginBottom: '7vh',
    color: colors.offWhite
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap-reverse',
    justifyContent: 'center',
    paddingBottom: '2em'
  }
})

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
    return <Lister list={this.state.postings} />
  }
}

PostingsHelper.defaultProps = {
  user: {}
}

class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.handleChange = tools.setupHandleChange(this)
    this.state = {}
  }

  navigateToPostings = (e) => {
    e.preventDefault()
    this.props.history.push('/postings')
  }

  render () {
    let user = window.user
    if (user == null) {
      return <Redirect to='/postings' />
    } else {
      return <div id='Dashboard' className={this.props.className}>
        <Nav banner>
          <NavLeft>
            <BigButton id='allposts' size='medium' color='gray' variant='flat' onClick={this.navigateToPostings} >
              All Posts
            </BigButton>
          </NavLeft>
          <NavRight>
            <LoginArea id='login' size='medium' variant='flat' />
          </NavRight>
        </Nav>
        <h2 className={this.props.classes.dashboardName} >
          {user.firstName + ' ' + user.lastName}
        </h2>
        <div className={this.props.classes.container}>
          <div style={{ minWidth: '50vw', width: 'calc(50vw + 10em)' }} >
            <PostingsHelper user={user} history={this.props.history} />
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
