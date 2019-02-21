// setup file
import { shallow } from 'enzyme'
import React from 'react'
import { expect } from 'chai'
import PageNotFound from '../../client/page-not-found/page-not-found'

describe('<PageNotFound />', () => {
  it('contains the 404 error message', () => {
    const wrapper = shallow(<PageNotFound />)
    expect(wrapper.containsMatchingElement(<h1>404 Page Not Found</h1>)).to.equal(true)
  })
})
