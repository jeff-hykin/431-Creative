import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import BigButton from '../components/big-button'
import { withStyles } from '@material-ui/core'
import 'react-toastify/dist/ReactToastify.min.css'
import { colors, style } from '../theme'
import Page from '../page'
import LoginArea from '../components/login-area'
import * as Nav from '../components/navbar'

export const classes = {
  banner: {
    backgroundColor: colors.blue,
    width: '100vw',
    height: 'calc(50vh + 3vw)',
    fontWeight: '300',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    color: colors.white,
    minHeight: 'fit-content',
    ...style.shadow
  },
  line: {
    height: '1px',
    background: 'white',
    width: '38vw',
    margin: '1rem'
  },
  content: {
    maxWidth: '100vw',
    padding: '2vw',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    '& h5': {
      paddingBottom: '1rem',
      fontSize: '2rem',
      fontWeight: '400',
      color: colors.darkGray,
      fontFamily: 'Quicksand'
    },
    '& button': {
      marginTop: '2rem'
    }
  },
  card: {
    color: colors.darkGray,
    padding: '2rem 4vw 1.5rem',
    margin: '0',
    textAlign: 'center',
    borderRadius: '0.4rem',
    alignContent: 'center',
    flexDirection: 'column',
    minWidth: '14em',
    flexGrow: '3',
    flexBasis: '24rem',
    maxWidth: '32rem',
    width: 'max-content',
    ...style.vbox
  },
  loginContainer: {
    display: 'flex',
    width: '100vw',
    paddingRight: `calc(${Nav.classes.banner.paddingRight} + ${Nav.classes.right.padding})`,
    paddingLeft: `calc(${Nav.classes.banner.paddingLeft} + ${Nav.classes.right.padding})`,
    paddingTop: `calc(${Nav.classes.banner.paddingTop} + ${Nav.classes.right.padding})`,
    justifyContent: 'flex-end',
    flexShrink: '5'
  },
  titleContainer: {
    ...style.vbox,
    padding: '0 4vw 6vh',
    justifyContent: 'center',
    flexGrow: '1'
  },
  title: {
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 'calc(3.4vw + 1vh + 2.3rem)',
    fontFamily: 'Quicksand'
  },
  subTitle: {
    textAlign: 'center',
    fontFamily: 'Quicksand'
  }
}

class SplashPage extends Component {
  /* istanbul ignore next */
  changePagesTo = (pageRoute) => (e) => {
    localStorage.setItem('lastPage', window.location.pathname)
    this.props.history.push(`/${pageRoute}`)
  }

  render () {
    let classes = this.props.classes
    return <div id='splashPage'>
      {/* Banner */}
      <div className={classes.banner} >
        <div className={classes.loginContainer}>
          { window.user != null && <BigButton id='dashboardButton' variant='outlined' size='medium' isNav color='green' onClick={e => this.props.history.push('/dashboard')}>
                Dashboard
          </BigButton>}
          <div style={{ width: '1rem' }} />
          <LoginArea variant='outlined' size='medium' />
        </div>
        <div className={classes.titleContainer}>
          <h2 id='aggieCodingConnect' className={classes.title}>
              Aggie Coding Connect
          </h2>
          <span className={classes.line} />
          <h6 className={classes.subTitle}>
              Where Coders Find Projects
          </h6>
        </div>
      </div>
      {/* Content */}
      <div className={classes.content} >
        {/* Create a Job Posting */}
        <div className={classes.card}>
          <h5 className={classes.bottomLeftTitle}>
            Get Help
          </h5>
          {'Need help with technology and programming? Create a post explaining what you need so that Aggies can help you out'}
          <BigButton id='createButton' color='green' className={classes.createButton} onClick={this.changePagesTo('makeposting')}>
            <span>Make Post</span>
          </BigButton>
        </div>
        {/* Browse Job Postings */}
        <div className={classes.card}>
          <h5>
            Give Help
          </h5>
          {'Looking for technical tasks, or a way to help out the A&M community? Look at the posts and see if there\'s one that matches your skillset'}
          <BigButton id='browseButton' color='green' onClick={this.changePagesTo('postings')}>
            <span>All Postings</span>
          </BigButton>
        </div>
      </div>
    </div>
  }
}

export default Page(withRouter(withStyles(classes)(SplashPage)))
