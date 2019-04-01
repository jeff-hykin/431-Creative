import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { LoginArea, classes } from '../../../client/components/login-area'
import BigButton from '../../../client/components/big-button'

describe('<LoginArea />', () => {
  let fakeProps = {
    classes: classes,
    history: []
  }

  it('login button when no user', () => {
    global.window.user = undefined
    const wrapper = shallow(<LoginArea {...fakeProps} />)
    expect(wrapper.exists('#loginButton')).to.equal(true)
    wrapper.find(BigButton).at(0).simulate('click')
  })

  it('logout button when user exists', () => {
    global.user = {
      username: 'bob'
    }
    global.window.user = global.user
    const wrapper = shallow(<LoginArea {...fakeProps} />)
    expect(wrapper.exists('#logoutButton')).to.equal(true)
    wrapper.find('#logoutButton').simulate('click')
    console.log(`history is:`, fakeProps.history)
    global.user = undefined
    global.window.user = undefined
  })
})
