import React from 'react'
import * as PropTypes from 'prop-types'
import { style } from '../../theme'
import { withStyles } from '@material-ui/core/styles'

import Item from './item'

let classes = {
  container: {
    width: 'calc(85% + 4rem)',
    maxWidth: 'calc(43rem + 11%)',
    minWidth: '5rem',
    flexBasis: '60%',
    flexGrow: '2',
    ...style.vbox
  }
}

function Lister ({ classes, list, color }) {
  const data = list.map(each => <Item color={color} key={each._id} {...each} />)

  if (data.length === 0) {
    return <div style={{ textAlign: 'center', color: color ? 'black' : 'white', width: '100%' }}>
      No Posts ¯\_(ツ)_/¯
    </div>
  }

  return <div className={classes.container}>
    {data}
  </div>
}

Lister.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape(Item.propTypes))
}

Lister.defaultProps = {
  list: []
}

export default withStyles(classes)(Lister)
