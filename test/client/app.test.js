import { mount } from 'enzyme'
import React from 'react'
import { expect } from 'chai'
import sinon from 'sinon'
import App from '../../client/app'
import '../../app'
import Routes from '../../client/routes'

describe('<App />', () => {
  it('componentWillMount gets called', () => {
    let spy = sinon.spy(App.prototype, 'componentWillMount')
    const wrapper = mount(<App />)
    expect(spy.called).to.equal(true)
    wrapper.unmount()
  })

  it('routes appear after loading', () => {
    const wrapper = mount(<App />)
    wrapper.setState({ loading: false })
    expect(wrapper.contains(Routes))
    wrapper.unmount()
  })
})
