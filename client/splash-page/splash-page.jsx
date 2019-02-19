import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'

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
  },
  mainDiv: {
    position: 'fixed',
    bottom: '0',
    right: '0'
  },
  whiteButton: {
    color: '#500000',
    backgroundColor: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#500000'
    }
  },
  maxWidth: {
    width: '100vw'
  }
}
export default withStyles(classes)(class extends React.Component {
  constructor (props) {
    super(props)
    this.state = { colorOfButtonText: '' }
  }

  render () {
    return <div className={this.props.className}>
      <AppBar className={this.props.classes.maxWidth} position='static'>
        <Toolbar>
          <Grid container direction='row' justify='flex-end' alignItems='center'>
            <Button color='inherit'>Login</Button>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={this.props.classes.triangleMaroon} />
      <div className={this.props.classes.triangleWhite} />
      <div className={this.props.classes.mainDiv}>
        <Button size='large' className={this.props.classes.whiteButton}>
          Browse
        </Button>
      </div>
    </div>
  }
})
