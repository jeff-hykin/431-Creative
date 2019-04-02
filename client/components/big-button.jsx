import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import Button from '@material-ui/core/Button'
import { colors } from '../theme'

const classes = {
  button: {
    minWidth: 'max-content',
    height: 'fit-content',
    padding: '0'
  },
  adjustFont: {
    padding: '1em 1.3em',
    minWidth: 'max-content',
    lineHeight: '1em'
  },
  bigFont: {
    padding: '1.1rem 2rem',
    transform: 'scale(1.16)'
  },
  gray: {
    backgroundColor: colors.gray,
    color: 'white'
  },
  red: {
    backgroundColor: colors.red,
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
  },
  trueButton: {
    borderRadius: '100vh',
    borderColor: colors.white,
    width: 'fit-content'
  }
}

let BigButton = ({ classes, color, isNav, children, label, className, variant, fontStyle, size, ...otherProps }) => {
  // default to large size
  size = size || 'large'
  // add in which classes should be attached
  let classString = classes.button
  classString += ' ' + (className || '')
  classString += ' ' + (color ? classes[color] : '')
  classString += ' ' + (isNav ? classes.isNav : '')
  // adjust the font size
  let fontAdjustment = classes.adjustFont
  fontAdjustment += ' ' + (size === 'large' ? classes.bigFont : '')

  if (variant === 'flat' || variant === 'outlined') {
    return <Button variant={variant} size={size} className={classString + ' ' + classes.trueButton} {...otherProps}>
      <span className={fontAdjustment} style={fontStyle}>
        {children}
      </span>
    </Button>
  }

  return <Fab variant='extended' size={size} className={classString} {...otherProps}>
    <span className={fontAdjustment} style={fontStyle}>
      {children}
    </span>
  </Fab>
}

export default withStyles(classes)(BigButton)
