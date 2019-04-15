import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar'
import { colors } from '../theme'

let classes = {
  snackBarError: {
    background: colors.red
  }
}

export let sendSnackbarMessage = (message) => {
  window.dispatchEvent(new CustomEvent('snackbar-normal-message', { detail: message }))
}

export let sendSnackbarError = (message) => {
  window.dispatchEvent(new CustomEvent('snackbar-error-message', { detail: message }))
}

export class GlobalSnackbar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      normalSnackbarIsOpen: false,
      normalMessage: '',
      errorSnackBarIsOpen: false,
      errorMessage: ''
    }
  }

  componentWillMount () {
    this.normalMessageListener = window.addEventListener('snackbar-normal-message', ({ detail }) =>
      this?.setState({ normalMessage: detail, normalSnackbarIsOpen: true })
    )
    this.errorMessageListener = window.addEventListener('snackbar-error-message', ({ detail }) =>
      this?.setState({ normalMessage: detail, normalSnackbarIsOpen: true })
    )
  }

  componentWillUnmount () {
    window.removeEventListener('snackbar-normal-message', this.normalMessageListener)
    window.removeEventListener('snackbar-error-message', this.errorMessageListener)
  }

  errorCloseHandler () {
    this.setState({ errorSnackBarIsOpen: false })
  }

  normalCloseHandler () {
    this.setState({ normalSnackbarIsOpen: false })
  }

  render () {
    return <Fragment>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={this.state.normalSnackbarIsOpen}
        onClose={this.normalCloseHandler.bind(this)}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span>{this.state.normalMessage}</span>}
        autoHideDuration={2000}
      />

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={this.state.errorSnackBarIsOpen}
        onClose={this.errorCloseHandler.bind(this)}
        ContentProps={{
          classes: {
            root: this.props.classes.snackBarError
          },
          'aria-describedby': 'message-id'
        }}
        message={<span>{this.state.errorMessage}</span>}
        autoHideDuration={2000}
      />
    </Fragment>
  }
}
export default withStyles(classes)(GlobalSnackbar)
