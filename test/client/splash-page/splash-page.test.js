import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'

import { expect } from 'chai'
import SplashPage from '../../../client/splash-page/splash-page'
import Button from '@material-ui/core/Button'
import BigButton from '../../../client/components/big-button'

describe('<SplashPage />', () => {
  it('has login, browse, and create buttons', () => {
    const wrapper = mount(
      <Router>
        <SplashPage />
      </Router>
    )
    expect(wrapper.find(Button)).to.have.lengthOf(1)
    expect(wrapper.find(BigButton)).to.have.lengthOf(3)
    for (let i = 0; i < wrapper.find(Button).length; i++) {
      wrapper.find(Button).at(i).simulate('click')
    }
    wrapper.unmount()
  })
})
