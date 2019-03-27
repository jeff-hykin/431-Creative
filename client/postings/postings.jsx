import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline'

import Page from '../page'
import Lister from '../components/lister'
import { api } from '../../backend/setup-functions'
import Navbar from '../components/navbar'

const styles = theme => ({
  color: {
    backgroundColor: '#fbf7f5',
    width: '100vw'
  },
  root: {
    backgroundColor: '#fbf7f5',
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

function Postings ({ classes }) {
  const [postings, setPostings] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await api['get-postings']()
      console.log(result)
      setPostings(result)
    }
    fetchData().catch(console.warn)
  }, [])
  return (
    <div className={classes.color}>
      <CssBaseline />
      <Navbar title='Postings' />
      <section className={classes.root}>
        <div className={classes.heroContent}>
          <Typography component='h1' variant='h2' align='center' color='textPrimary' gutterBottom>
            Postings
          </Typography>
        </div>
        <Lister list={postings} />
      </section>
    </div>
  )
}

export default Page(withStyles(styles)(Postings))
