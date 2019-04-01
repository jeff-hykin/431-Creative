import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core'
import { colors } from '../theme'
import Lister from '../components/lister'
import { navigateToEditPosting, navigateToShowPosting, deletePosting, transformPostings } from '../components/lister/utils'
import Page from '../page'
import { api } from '../../backend/setup-functions'

const classes = theme => ({
  titleBar: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 0,
    padding: 10,
    paddingBottom: 10,
    backgroundColor: colors.blue,
    width: '100vw',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
  },
  contactBox: {
    padding: 40,
    flexShrink: 1
  },
  dashboardName: {
    marginRight: 'auto',
    color: colors.white,
    margin: 10
  },
  contactInfo: {
    color: colors.white,
    padding: 30,
    width: '40vw',
    margin: 0,
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);',
    borderRadius: '2px',
    backgroundColor: colors.blue
  },
  leftButton: {
    marginRight: 'auto',
    height: 40,
    margin: 10,
    borderRadius: '2rem',
    color: colors.white,
    borderColor: colors.white,
    backgroundColor: colors.teal
  },
  rightButton: {
    height: 40,
    margin: 10,
    borderRadius: '2rem',
    color: colors.white,
    borderColor: colors.white,
    backgroundColor: colors.teal
  },
  container: {
    display: 'flex'
  },
  postingsbox: {
    padding: 40,
    flexShrink: 1,
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
  navigateToPostings = (e) => {
    e.preventDefault()
    this.props.history.push('/postings')
  }

  render () {
    let user = window.user
    if (window.user == null) {
      return <Redirect to='/' />
    } else {
      return <div id='Dashboard' className={this.props.className}>
        <div className={this.props.classes.titleBar}>
          <Button id='allposts' variant='outlined' className={this.props.classes.leftButton} onClick={this.navigateToPostings}>
              All Posts
          </Button>
          <h3 className={this.props.classes.dashboardName} >{user.firstName + ' ' + user.lastName}</h3>
          <a href='/auth/google/logout'><Button id='loginButton' variant='outlined' className={this.props.classes.rightButton}>
              Logout
          </Button></a>
        </div>

        <div className={this.props.classes.container}>
          <div className={this.props.classes.postingsbox}>
            <PostingsHelper user={user} history={this.props.history} />
          </div>
          <div className={this.props.classes.contactBox}>
            <div className={this.props.classes.contactInfo}>
              <h5>{'Contact info:'}</h5>
              <div>{'Email:  ' + user.email}</div>
            </div>
          </div>
        </div>
      </div>
    }
  }
}

export { Dashboard, classes }
export default Page(withRouter(withStyles(classes)(Dashboard)))
