import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'

// import { expect } from 'chai'
import Dashboard from '../../../client/dashboard/dashboard'
import Button from '@material-ui/core/Button'
// import UserContext from '../../../client/user-context'

describe('<Dashboard />', () => {
  it.skip('has clickable buttons that dont crash', () => {
    // const context = {
    //   user: {
    //     email: 'test@gmail.com',
    //     firstName: 'Test',
    //     lastName: 'Smith'
    //   }
    // }
    const wrapper = mount(
      <Router>
        <Dashboard />
      </Router>
      , { context })
    // wrapper.setContext(context)

    for (let i = 0; i < wrapper.find(Button).length; i++) {
      wrapper.find(Button).at(i).simulate('click')
    }
    wrapper.unmount()
  })
})
