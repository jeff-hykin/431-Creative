import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Posting from './posting'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    margin: '50px auto',
    width: '100%',
    maxWidth: '800px'
  }
})

function Postings ({ classes }) {
  return (
    <section className={classes.root}>
      <Typography variant='h1' gutterBottom>
        Postings
      </Typography>
      <Grid
        container
        direction='column'
        justify='center'
        alignItems='center'
        spacing={40}
      >
        <Grid item>
          <Posting />
        </Grid>
        <Grid item>
          <Posting />
        </Grid>
      </Grid>
    </section>
  )
}

export default withStyles(styles)(Postings)
