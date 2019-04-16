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
  },
  noPostsMessage: {
    ...style.vbox,
    width: '50%',
    minWidth: '0'
  }
}

function Lister ({ classes, list, color }) {
  const data = list.map(each => <Item color={color} key={each._id} {...each} />)

  if (data.length === 0) {
    return <div className={classes.noPostsMessage}>
      <div style={{ ...style.paper, width: 'fit-content', borderRadius: '100vh', padding: '1rem', color: 'black' }}>
        No Posts ¯\_(ツ)_/¯
      </div>
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
