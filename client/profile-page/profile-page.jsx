import React from 'react'
// import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core'
import 'react-toastify/dist/ReactToastify.min.css'
import { colors } from '../theme'

export const classes = {
  titleBar: {
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingTop: '1%',
    paddingBottom: '1%',
    backgroundColor: colors.teal,
    width: '100%',
    height: '20%'
  }
}

export default withStyles(classes)(class extends React.Component {
  render () {
    return <div id='ProfilePage' className={this.props.className}>
      <div className={this.props.classes.titleBar}>
        <h5>
          Your Name
        </h5>
      </div>
    </div>
  }
})
