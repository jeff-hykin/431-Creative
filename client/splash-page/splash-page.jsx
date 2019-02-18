import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core'

export const classes = {
  page: {
    flexDirection: 'column',
    transition: 'color 1500ms ease-in-out'
  },
  pageNotLoaded: {
    color: 'white'
  },
  pageFullyLoaded: {
    color: 'black'
  },
  triangleMaroon: {
    position: 'fixed',
  	bottom: '0',
  	right: '0',
    borderLeft: '50vw solid transparent',
    borderRight: '50vw solid #500000',
    borderBottom: '50vh solid transparent',
    borderTop: '50vh solid #500000',
    width: '0',
    height: '0'
  },
  triangleWhite: {
    position: 'fixed',
  	bottom: '0',
  	right: '0',
    borderLeft: '50vw solid #FFFFFF',
    borderRight: '50vw solid transparent',
    borderBottom: '50vh solid #FFFFFF',
    borderTop: '50vh solid transparent',
    width: '0',
    height: '0'
  }
}
export default withStyles(classes)(class extends React.Component {
  constructor (props) {
    super(props)
    this.state = { colorOfButtonText: '' }
  }

  render () {
    return <div className={this.props.className}>
      <div className={this.props.classes.triangleMaroon} />
      <div className={this.props.classes.triangleWhite} />
    </div>
  }
})
