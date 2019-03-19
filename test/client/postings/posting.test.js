import React from 'react'
import { mount } from 'enzyme'

import { expect } from 'chai'
import Posting from '../../../client/postings/posting'

describe('<Posting />', () => {
  let props
  let mountedPosting
  const postingComponent = () => {
    if (!mountedPosting) {
      mountedPosting = mount(
        <Posting {...props} />
      )
    }
    return mountedPosting
  }

  beforeEach(() => {
    props = {}
    mountedPosting = undefined
  })

  it('is able to mount', () => {
    const section = postingComponent().find('div')
    expect(section.length).to.be.gt(1)
  })
})
