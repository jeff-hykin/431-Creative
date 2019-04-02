// import React from 'react'
// import { mount } from 'enzyme'
import { expect } from 'chai'
import { navigateToShowPosting, navigateToEditPosting, transformPostings } from '../../../../client/components/lister/utils'

describe('Lister utils', () => {
  it('Naviation utils correctly redirect', () => {
    navigateToShowPosting([], '123')
    navigateToEditPosting([], '123')
  })
  it('Transform has correct output', () => {
    expect(transformPostings([], {})).to.not.equal(null)
  })
})
