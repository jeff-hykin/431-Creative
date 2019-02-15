// setup file
import { shallow } from 'enzyme'
import React from 'react'
import { expect } from 'chai'
import Nomatch from '../client/nomatch/index'

describe('<Nomatch />', () => {
  it('contains the 404 error message', () => {
    const wrapper = shallow(<Nomatch />)
    expect(wrapper.containsMatchingElement(<h1>404 Page Not Found</h1>)).to.equal(true)
  })
})
