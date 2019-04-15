import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { expect } from 'chai'
import { mount } from 'enzyme'
import Dashboard from '../../../client/dashboard/index'
import * as tools from '../../tools'

describe('<Dashboard />', function () {
  it('should render', function () {
    tools.setNormalUser()
    let wrapper = mount(
      <Router>
        <Dashboard />
      </Router>
    )
    expect(wrapper.contains(<Dashboard />)).to.equal(true)

    wrapper.unmount()

    tools.unsetUser()
  })
})
