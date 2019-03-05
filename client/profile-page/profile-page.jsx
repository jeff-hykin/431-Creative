import React from 'react'
import { withStyles } from '@material-ui/core'
import 'react-toastify/dist/ReactToastify.min.css'

export const classes = {}

export default withStyles(classes)(class extends React.Component {
  render () {
    return <div id='ProfilePage' className={this.props.className}>
      <h5>
        profile
      </h5>
    </div>
  }
})
