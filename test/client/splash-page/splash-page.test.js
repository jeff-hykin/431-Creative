import { mount } from 'enzyme'
import React from 'react'
import { expect } from 'chai'
import SplashPage from '../../../client/splash-page/splash-page'
import Button from '@material-ui/core/Button'

describe('<SplashPage />', () => {
  it('has login, browse, and create buttons', () => {
    const wrapper = mount(<SplashPage />)
    expect(wrapper.find(Button)).to.have.lengthOf(3)
    wrapper.unmount()
  })
})
