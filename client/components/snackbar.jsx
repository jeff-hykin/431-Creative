import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar'
import { colors } from '../theme'

let classes = {
  snackBarError: {
    background: colors.softRed
  }
}

export let sendSnackbarMessage = (message) => {
  window.dispatchEvent(new CustomEvent('snackbar-normal-message', { detail: message }))
}

export let sendSnackbarError = (message) => {
  window.dispatchEvent(new CustomEvent('snackbar-error-message', { detail: message }))
}

class GlobalSnackbar extends React.Component {
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
    window.addEventListener('snackbar-normal-message', ({ detail }) =>
      this?.setState({ normalMessage: detail, normalSnackbarIsOpen: true })
    )
    window.addEventListener('snackbar-error-message', ({ detail }) =>
      this?.setState({ normalMessage: detail, normalSnackbarIsOpen: true })
    )
  }

  render () {
    return <Fragment>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={this.state.normalSnackbarIsOpen}
        onClose={e => this.setState({ normalSnackbarIsOpen: false })}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span>{this.state.normalMessage}</span>}
        autoHideDuration={2000}
      />

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={this.state.errorSnackBarIsOpen}
        onClose={e => this.setState({ errorSnackBarIsOpen: false })}
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