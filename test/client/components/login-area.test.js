import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import * as tools from '../../tools'
import { LoginArea, classes } from '../../../client/components/login-area'
import BigButton from '../../../client/components/big-button'

describe('<LoginArea />', () => {
  let fakeProps = {
    classes: classes,
    history: []
  }

  it('login button when no user', () => {
    tools.unsetUser()
    const wrapper = shallow(<LoginArea {...fakeProps} />)
    expect(wrapper.exists('#loginButton')).to.equal(true)
    wrapper.find(BigButton).at(0).simulate('click')
  })

  it('logout button when user exists', () => {
    tools.setNormalUser()
    const wrapper = shallow(<LoginArea {...fakeProps} />)
    expect(wrapper.exists('#logoutButton')).to.equal(true)
    wrapper.find('#logoutButton').simulate('click')
    tools.unsetUser()
  })
})
