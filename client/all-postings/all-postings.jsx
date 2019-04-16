import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Page from '../page'
import Lister from '../components/lister'
import { api } from '../../backend/setup-functions'
import { Nav, NavLeft, NavRight, NavSpacer } from '../components/navbar'
import { style } from '../theme'
import LoginArea from '../components/login-area'
import BigButton from '../components/big-button'
import { navigateToEditPosting, navigateToShowPosting, deletePosting, transformPostings } from '../components/lister/utils'

/* istanbul ignore next */
const styles = theme => ({
  wrapper: {
    width: '100vw',
    ...style.vbox
  },
  content: {
    ...style.vbox,
    maxWidth: '100%',
    width: '100%'
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Quicksand, Roboto, Helvetica, Arial, sans-serif',
    fontSize: '60px',
    fontStretch: '100%',
    fontWeight: '300',
    marginTop: '2.5rem',
    marginBottom: '2.5rem'
  }
})

/* istanbul ignore next */
export const onClickNewPosting = (e, history) => {
  if (window.user != null) {
    history.push('/makeposting')
  } else {
    window.location.href = '/auth/google'
  }
}

/* istanbul ignore next */
export function AllPostings ({ classes, history }) {
  localStorage.setItem('lastPage', window.location.pathname)
  const [postings, setPostings] = useState([])

  useEffect(() => {
    /* istanbul ignore next */
    const fetchData = async () => {
      const result = await api['get-postings']().then(resp => (
        transformPostings(resp, {
          showEdit: true,
          showView: true,
          showDelete: true,
          onEdit: navigateToEditPosting.bind(this, history),
          onDelete: deletePosting,
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
            Make Post
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
      <section className={classes.content}>
        <h2 className={classes.title}>
          Postings
        </h2>
        <Lister color list={postings} />
      </section>
    </div>
  )
}

/* istanbul ignore next */
export default Page(withRouter(withStyles(styles)(AllPostings)))
