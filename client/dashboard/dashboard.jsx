import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core'
import { colors } from '../theme'
import Grid from '@material-ui/core/Grid'
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
    padding: 40,
    flexShrink: 1
  }
})

class Dashboard extends Component {
  navigateToPostings = (e) => {
    e.preventDefault()
    this.props.history.push('/postings')
  }
  
  getPostings(user) {
    response = api['get-postings']({ 'OwnerId': user._id })
    
    let postings = []
  
    // Outer loop to create parent
    // for (let i = 0; i < response.size; i++) {
    //   let description 
    //   for (let j = 0; j < 5; j++) {
    //     children.push(<td>{`Column ${j + 1}`}</td>)
    //   }
    response.forEach(function(item) {
      postings.push(
        <Grid item>
          <Lister list={[{
            title: item.title,
            id: 0,
            showView: true,
            descriptions: item.description,
            skills: item.skills,
            onDelete: console.log,
            onView: console.log,
            onEdit: console.log
          }]} />
        </Grid>
      )
    });
    return postings
    console.log(user._id)
    api['get-postings']({ 'OwnerId': user._id }).then(response => { console.log(response) })
  }

  render () {
    return <div id='Dashboard' className={this.props.className}>
      <div className={this.props.classes.titleBar}>
        <Button id='allposts' variant='outlined' className={this.props.classes.leftButton} onClick={this.navigateToPostings}>
            All Posts
        </Button>
        <a href='/auth/google/logout'><Button id='loginButton' variant='outlined' className={this.props.classes.rightButton}>
            Logout
        </Button></a>
        <UserContext.Consumer>
          {user => {
            /* istanbul ignore next */
            if (user == null) {
              // location.assign('/auth/google')
              return (
                <h3 className={this.props.classes.dashboardName} >Your Name</h3>
              )
            } else {
              this.getPostings(user)
              return (
                <h3 className={this.props.classes.dashboardName} >{user.firstName + ' ' + user.lastName}</h3>
              )
            }
          }
          }
        </UserContext.Consumer>
      </div>

      <div className={this.props.classes.container}>
        <div className={this.props.classes.postingsbox}>
          <Grid
            container
            direction='column'
            margin={5}
            justify='center'
            alignItems='center'
            spacing={40}
          >
            {this.getPostings}
          </Grid>
        </div>
        <div className={this.props.classes.contactBox}>
          <UserContext.Consumer>
            {user => {
              /* istanbul ignore next */
              if (user == null) {
                return (
                  <h5 className={this.props.classes.contactInfo} >Your Name</h5>
                )
              } else {
                return (<div>
                  <h5 className={this.props.classes.contactInfo} >{'Contact info:'}</h5>
                  <div className={this.props.classes.contactInfo} >{'Email:  ' + user.email}</div>
                </div>
                )
              }
            }
            }
          </UserContext.Consumer>
        </div>
      </div>
    </div>
  }
}

export default Page(withRouter(withStyles(classes)(Dashboard)))
