import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'

import { expect } from 'chai'
import ProfilePage from '../../../client/profile-page/profile-page'
import Button from '@material-ui/core/Button'

describe('<ProfilePage />', () => {
  it('has login, browse, and create buttons', () => {
    const wrapper = mount(
      <Router>
        <ProfilePage />
      </Router>
    )
    expect(wrapper.find(Button)).to.have.lengthOf(4)
    wrapper.unmount()
  })
})
