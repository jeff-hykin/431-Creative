import React from 'react'
import * as PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

/**
 * Display a list of descriptions in a 3x(n/3) matrix
 * @param {Array.<Object>} descriptions - Array of descriptions
 * @param {string} paperStyle - className that goes on the Paper component of each description
 */
function ItemDescriptions ({ descriptions, paperStyle }) {
  return (
    <Grid
      justify='flex-start'
      spacing={40}
      direction='row'
      alignItems='stretch'
      container
    >
      {descriptions.map(({ title, body, id }) => (
        <Grid key={id} xs={4} item>
          <Paper className={paperStyle} square>
            <Typography gutterBottom variant='h5'>
              {title}
            </Typography>
            <Typography component='p'>
              {body}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}

ItemDescriptions.propTypes = {
  paperStyle: PropTypes.string,
  descriptions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      body: PropTypes.string,
      id: PropTypes.number
    })
  )
}

export default ItemDescriptions
