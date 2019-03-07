// setup file
import { shallow } from 'enzyme'
import React from 'react'
import { expect } from 'chai'
import PageNotFound from '../../../client/page-not-found/page-not-found'

describe('<PageNotFound />', () => {
  it('contains the 404 error message', () => {
    const wrapper = shallow(<PageNotFound />)
    expect(wrapper.containsMatchingElement(<h2>404</h2>)).to.equal(true)
    expect(wrapper.containsMatchingElement(<h5>Page Not Found</h5>)).to.equal(true)
    wrapper.unmount()
  })
})
