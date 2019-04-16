import React from 'react'
import { withStyles } from '@material-ui/styles'
import { colors } from '../theme'

let viewPadding = 4
let leftAndRight = {
  display: 'flex',
  flexDirection: 'row',
  padding: '1em',
  width: 'fit-content',
  boxSizing: 'content-box',
  flexWrap: 'wrap',
  '& button': {
    marginBottom: '1rem'
  }
}
export const classes = {
  main: {
    top: 0,
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: `${viewPadding}vw`,
    paddingRight: `${viewPadding}vw`,
    paddingTop: `${viewPadding / 2}vw`,
    flexWrap: 'wrap',
    maxWidth: '100vw'
  },
  left: {
    ...leftAndRight,
    justifyContent: 'flex-start'
  },
  right: {
    ...leftAndRight,
    justifyContent: 'flex-end'
  },
  banner: {
    backgroundColor: colors.blue,
    height: 'fit-content',
    paddingLeft: `${viewPadding / 2}vw`,
    paddingRight: `${viewPadding / 2}vw`,
    paddingTop: `${viewPadding / 4}vw`,
    minHeight: '33vh'
  }
}

export let NavSpacer = () => <div style={{ width: '1.5em' }} />

export let Nav = withStyles(classes)(({ classes, children, banner, ...otherProps }) => {
  let classString = classes.main
  classString += ' ' + (banner ? classes.banner : '')
  return <nav className={classString} {...otherProps}>
    <div style={{ flexBasis: '100%', height: 'fit-content', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
      {children}
    </div>
  </nav>
})

export let NavLeft = withStyles(classes)(({ classes, children }) => {
  return <div className={classes.left} >
    {children}
  </div>
})

export let NavRight = withStyles(classes)(({ classes, children }) => {
  return <div className={classes.right} >
    {children}
  </div>
})
