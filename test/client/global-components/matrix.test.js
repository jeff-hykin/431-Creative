import { mount } from 'enzyme'
import React from 'react'
import { expect } from 'chai'
import sinon from 'sinon'
import Matrix from '../../../client/global-components/matrix'

describe.skip('<Matrix />', () => {
  it('calls componentDidMount', () => {
    mount(<Matrix />)
    sinon.spy(Matrix.prototype, 'componentDidMount')
    expect(Matrix.prototype.componentDidMount.calledOnce).to.equal(true)
  })
})
