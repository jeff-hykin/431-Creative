import { mount } from 'enzyme'
import React from 'react'
import SnackBar, { sendSnackbarMessage, sendSnackbarError } from '../../../client/components/snackbar'

describe('<SnackBar />', () => {
  it('componentWillMount gets called', () => {
    const wrapper = mount(<SnackBar />)
    wrapper.unmount()
  })
  it('snackbar normal message can be called', () => {
    const wrapper = mount(<SnackBar />)
    sendSnackbarMessage('Testing')
    wrapper.unmount()
  })
  it('snackbar error message can be called', () => {
    const wrapper = mount(<SnackBar />)
    sendSnackbarError('Testing')
    wrapper.unmount()
  })
})
