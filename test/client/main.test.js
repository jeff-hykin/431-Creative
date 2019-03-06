import { mount } from 'enzyme'
import React from 'react'
import { expect } from 'chai'
import sinon from 'sinon'
import App from '../../client/main'
import '../../app'

describe('<App />', () => {
  it.skip('has a user in state', () => {
    const wrapper = mount(<App />)
    console.log('WRAPPER STATE:', wrapper.state())
    expect(wrapper.state('user')).to.equal(null)
    wrapper.unmount()
  })

  it('componentDidMount gets called', () => {
    let spy = sinon.spy(App.prototype, 'componentDidMount')
    const wrapper = mount(<App />)
    expect(spy.called).to.equal(true)
    wrapper.unmount()
  })
})
