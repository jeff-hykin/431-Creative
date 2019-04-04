import React from 'react'
import * as PropTypes from 'prop-types'

import Item from './item'
import Grid from '@material-ui/core/Grid'

function Lister ({ list }) {
  const data = list.map(l => <Item key={l._id} {...l} />)

  if (data.length === 0) {
    return <div style={{ textAlign: 'center', color: 'white', width: '100%' }}>
      No Posts ¯\_(ツ)_/¯
    </div>
  }
  return <Grid container justify='center' alignItems='center' spacing={40} >
    {data}
  </Grid>
}

Lister.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape(Item.propTypes))
}

Lister.defaultProps = {
  list: []
}

export default Lister
