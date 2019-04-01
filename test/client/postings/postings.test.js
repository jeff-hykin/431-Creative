import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'
import { expect } from 'chai'
import { Postings } from '../../../client/postings/postings'
import BigButton from '../../../client/components/big-button'
import * as tools from '../../tools'

let mountPostings = (props = {
  wallpaperPath: undefined,
  userInfoMessage: undefined,
  onUnlocked: undefined,
  classes: {},
  history: []
}) => mount(
  <Router>
    <Postings {...props} />
  </Router>
)

describe('<Postings />', () => {
  it('is able to mount', () => {
    const wrapper = mountPostings()
    let section = wrapper.find('section')
    expect(section.length).to.be.eq(1)
    wrapper.unmount()
  })

  it('is able to click buttons with user logged out', () => {
    const wrapper = mountPostings()
    tools.clickAll(wrapper, BigButton)
    wrapper.unmount()
  })

  it('is able to click buttons with user logged in', () => {
    tools.setNormalUser()
    const wrapper = mountPostings()
    tools.clickAll(wrapper, BigButton)
    wrapper.unmount()
    tools.unsetUser()
  })
})
