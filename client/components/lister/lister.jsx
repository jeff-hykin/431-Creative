import React from 'react'
import * as PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'

import Item from './item'

function Lister ({ list }) {
  const data = list.map(l => (
    <Grid item key={l._id}>
      <Item {...l} />
    </Grid>
  ))

  if (data.length === 0) {
    return <p>No data to show!</p>
  }
  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      spacing={40}
    >
      {data}
    </Grid>
  )
}

Lister.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape(Item.propTypes))
}

Lister.defaultProps = {
  list: []
}

export default Lister
