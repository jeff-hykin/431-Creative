import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'
import { expect } from 'chai'
import MakePosting from '../../../client/make-posting/make-posting'
import PostingPage from '../../../client/components/posting-page'

describe('<MakePosting />', () => {
  it('to have a posting page', () => {
    const wrapper = mount(<Router><MakePosting /></Router>)
    expect(wrapper.find(PostingPage))
    wrapper.unmount()
  })
})
