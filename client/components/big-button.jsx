import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import { colors } from '../theme'

const classes = {
  adjustFont: {
    padding: '1em',
    transform: 'scale(1.16)'
  },
  gray: {
    backgroundColor: colors.gray,
    color: 'white'
  },
  red: {
    backgroundColor: colors.softRed,
    color: 'white'
  },
  blue: {
    backgroundColor: colors.blue,
    color: 'white'
  },
  green: {
    backgroundColor: colors.teal,
    color: 'white'
  }
}

let BigButton = ({ classes, color, children, label, className, ...otherProps }) => {
  return <Fab variant='extended' size='large' className={classes[color] + ' ' + className} {...otherProps}>
    <span className={classes.adjustFont}>
      {children}
    </span>
  </Fab>
}

export default withStyles(classes)(BigButton)
