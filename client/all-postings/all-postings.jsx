import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Page from '../page'
import Lister from '../components/lister'
import { api } from '../../backend/setup-functions'
import { Nav, NavLeft, NavRight, NavSpacer } from '../components/navbar'
import LoginArea from '../components/login-area'
import BigButton from '../components/big-button'
import { navigateToShowPosting, transformPostings } from '../components/lister/utils'

/* istanbul ignore next */
const styles = theme => ({
  wrapper: {
    width: '100vw'
  },
  root: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  }
})

/* istanbul ignore next */
let onClickNewPosting = (e, history) => {
  if (window.user != null) {
    history.push('/makeposting')
  } else {
    window.location.href = '/auth/google'
  }
}

/* istanbul ignore next */
export function AllPostings ({ classes, history }) {
  const [postings, setPostings] = useState([])

  useEffect(() => {
    /* istanbul ignore next */
    const fetchData = async () => {
      const result = await api['get-postings']().then(resp => (
        transformPostings(resp, {
          onView: navigateToShowPosting.bind(this, history)
        }
        )))
      setPostings(result)
    }
    fetchData().catch(console.warn)
  }, [])

  return (
    <div className={classes.wrapper}>
      <Nav>
        <NavLeft>
          <BigButton id='about' isNav color='gray' onClick={e => history.push('/about')}>
            About
          </BigButton>
          <NavSpacer />
          <BigButton isNav color='blue' id='createButton' onClick={e => onClickNewPosting(e, history)}>
            New Post
          </BigButton>
        </NavLeft>
        <NavRight>
          { window.user != null && <BigButton id='dashboardButton' isNav color='green' onClick={e => history.push('/dashboard')}>
            Dashboard
          </BigButton>}
          <NavSpacer />
          <LoginArea />
        </NavRight>
      </Nav>
      <section className={classes.root}>
        <div className={classes.heroContent}>
          <Typography id='postingTitle' component='h1' variant='h2' align='center' color='textPrimary' gutterBottom>
            Postings
          </Typography>
        </div>
        <Lister list={postings} />
      </section>
    </div>
  )
}

/* istanbul ignore next */
export default Page(withRouter(withStyles(styles)(AllPostings)))
