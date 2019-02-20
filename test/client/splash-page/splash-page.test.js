import { mount } from 'enzyme'
import React from 'react'
import { expect } from 'chai'
import SplashPage from '../../../client/splash-page/splash-page'
import Button from '@material-ui/core/Button'

describe('<SplashPage />', () => {
  it('has a single login button', () => {
    const wrapper = mount(<SplashPage />)
    expect(wrapper.find(Button)).to.have.lengthOf(1)
  })
})
