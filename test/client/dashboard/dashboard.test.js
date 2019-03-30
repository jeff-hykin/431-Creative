import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'

// import { expect } from 'chai'
import Dashboard from '../../../client/dashboard/dashboard'
import Button from '@material-ui/core/Button'

describe('<Dashboard />', () => {
  it('has clickable buttons that dont crash', () => {
    const user = {
      email: 'test@gmail.com',
      firstName: 'Test',
      lastName: 'Smith'
    }

    window.user = user

    const wrapper = mount(
      <Router>
        <Dashboard />
      </Router>
    )

    for (let i = 0; i < wrapper.find(Button).length; i++) {
      wrapper.find(Button).at(i).simulate('click')
    }
    wrapper.unmount()
  })
})
