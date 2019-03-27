import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core'
import { colors } from '../theme'
import Lister from '../components/lister'
import UserContext from '../user-context'
import Page from '../page'
import { api } from '../../backend/setup-functions'

const classes = theme => ({
  titleBar: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 0,
    padding: 10,
    paddingBottom: 60,
    backgroundColor: colors.teal,
    width: '100vw'
  },
  contactBox: {
    padding: 40,
    flexShrink: 1
  },
  dashboardName: {
    color: colors.white,
    margin: 10,
    width: '100vw'
  },
  contactInfo: {
    color: colors.white,
    padding: 30,
    width: '40vw',
    margin: 0,
    backgroundColor: colors.teal
  },
  leftButton: {
    marginRight: 'auto',
    height: 40,
    margin: 10,
    borderRadius: '2rem',
    color: colors.white,
    borderColor: colors.white,
    backgroundColor: colors.blue
  },
  rightButton: {
    height: 40,
    margin: 10,
    borderRadius: '2rem',
    color: colors.white,
    borderColor: colors.white,
    backgroundColor: colors.blue
  },
  container: {
    display: 'flex'
  },
  postingsbox: {
    // padding: 40,
    // flexShrink: 1
    width: '50vw'
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

  transformPostings = postings => postings.map(p => Object.assign(p, {
    showEdit: true,
    showView: true,
    showDelete: true,
    onEdit: console.log,
    onDelete: console.log,
    onView: console.log
  }))

  getPostings = () => {
    api['get-postings']({ 'ownerId': this.props.user._id }).then(resp => (
      this.setState({
        postings: this.transformPostings(resp)
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
  navigateToPostings = (e) => {
    e.preventDefault()
    this.props.history.push('/postings')
  }

  render () {
    const user = this.context
    if (user == null) {
      // TODO: redirect?
      return null
    }

    return <div id='Dashboard' className={this.props.className}>
      <div className={this.props.classes.titleBar}>
        <Button id='allposts' variant='outlined' className={this.props.classes.leftButton} onClick={this.navigateToPostings}>
            All Posts
        </Button>
        <a href='/auth/google/logout'><Button id='loginButton' variant='outlined' className={this.props.classes.rightButton}>
            Logout
        </Button></a>
        <h3 className={this.props.classes.dashboardName} >{user.firstName + ' ' + user.lastName}</h3>
      </div>

      <div className={this.props.classes.container}>
        <div className={this.props.classes.postingsbox}>
          <PostingsHelper user={user} />
        </div>
        <div className={this.props.classes.contactBox}>
          <div>
            <h5 className={this.props.classes.contactInfo} >{'Contact info:'}</h5>
            <div className={this.props.classes.contactInfo} >{'Email:  ' + user.email}</div>
          </div>
        </div>
      </div>
    </div>
  }
}

Dashboard.contextType = UserContext

export default Page(withRouter(withStyles(classes)(Dashboard)))
