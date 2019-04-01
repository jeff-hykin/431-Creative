import React from 'react'
import * as PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'

import Item from './item'

function Lister ({ list, xs }) {
  const data = list.map(l => (
    <Grid item key={l._id} xs={xs} zeroMinWidth>
      <Item {...l} />
    </Grid>
  ))

  if (data.length === 0) {
    return <div style={{ textAlign: 'center', width: '100%' }}>
      No Posts ¯\_(ツ)_/¯
    </div>
  }
  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      spacing={40}
    >
      {data}
    </Grid>
  )
}

Lister.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape(Item.propTypes)),
  xs: PropTypes.number
}

Lister.defaultProps = {
  list: [],
  xs: 10
}

export default Lister
