import React from 'react'
import { withStyles } from '@material-ui/styles'

let viewPadding = 4
let emPadding = '3em'
let leftAndRight = {
  display: 'flex',
  flexDirection: 'row',
  paddingLeft: `calc(${viewPadding}vw + 1em)`,
  paddingRight: `calc(${viewPadding}vw + 1em)`,
  paddingTop: `calc(${viewPadding / 2}vw + 1em)`,
  paddingBottom: emPadding,
  width: 'fit-content',
  boxSizing: 'content-box',
  flexWrap: 'wrap'
}
const classes = theme => ({
  main: {
    width: '100vw',
    display: 'flex',
    justifyContent: 'space-between',
    // position: 'sticky', // this could enabled but it would mess up the mobile view
    top: 0
  },
  left: {
    ...leftAndRight,
    justifyContent: 'flex-start'
  },
  right: {
    ...leftAndRight,
    justifyContent: 'flex-end'
  }
})

export let NavSpacer = () => <div style={{ width: '1.5em' }} />

export let Nav = withStyles(classes)(({ classes, children }) => {
  return <nav className={classes.main}>
    {children}
  </nav>
})

export let NavLeft = withStyles(classes)(({ classes, children }) => {
  return <div className={classes.left} >
    <div className={classes.arcBackground} />
    {children}
  </div>
})

export let NavRight = withStyles(classes)(({ classes, children }) => {
  return <div className={classes.right} >
    <div className={classes.arcBackground} />
    {children}
  </div>
})
