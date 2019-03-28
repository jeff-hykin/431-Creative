import React from 'react'
import { mount } from 'enzyme'

import { expect } from 'chai'
import Postings from '../../../client/postings/postings'

describe('<Postings />', () => {
  let props
  let mountedPostings
  const postingsComponent = () => {
    if (!mountedPostings) {
      mountedPostings = mount(
        <Postings {...props} />
      )
    }
    return mountedPostings
  }

  beforeEach(() => {
    props = {
      wallpaperPath: undefined,
      userInfoMessage: undefined,
      onUnlocked: undefined
    }
    mountedPostings = undefined
  })

  it('is able to mount', () => {
    const wrapper = postingsComponent()
    let section = wrapper.find('section')
    expect(section.length).to.be.eq(1)
    wrapper.unmount()
  })
})
