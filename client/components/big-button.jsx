import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import { colors } from '../theme'

const classes = {
  button: {
    minWidth: 'max-content'
  },
  adjustFont: {
    padding: '1em',
    transform: 'scale(1.16)',
    minWidth: 'max-content'
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
  },
  isNav: {
    marginBottom: '1em'
  }
}

let BigButton = ({ classes, color, isNav, children, label, className, ...otherProps }) => {
  let classString = classes.button
  classString += ' ' + (className || '')
  classString += ' ' + (color ? classes[color] : '')
  classString += ' ' + (isNav ? classes.isNav : '')
  return <Fab variant='extended' size='large' className={classString} {...otherProps}>
    <span className={classes.adjustFont}>
      {children}
    </span>
  </Fab>
}

export default withStyles(classes)(BigButton)
