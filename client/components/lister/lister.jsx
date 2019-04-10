import React from 'react'
import * as PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'

import Item from './item'

function Lister ({ list, color }) {
  const data = list.map(each => <Item color={color} key={each._id} {...each} />)

  if (data.length === 0) {
    return <div style={{ textAlign: 'center', color: color ? 'black' : 'white', width: '100%' }}>
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
