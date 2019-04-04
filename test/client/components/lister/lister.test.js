import React from 'react'
import { mount } from 'enzyme'

import { expect } from 'chai'
import Lister from '../../../../client/components/lister/lister'

describe('<Lister />', () => {
  let props
  let mountedLister
  const postingsComponent = () => {
    if (!mountedLister) {
      mountedLister = mount(
        <Lister {...props} />
      )
    }
    return mountedLister
  }

  beforeEach(() => {
    props = {
      list: undefined
    }
    mountedLister = undefined
  })

  it('shows message when no items provided', () => {
    props = {
      list: []
    }
    const p = postingsComponent().find('div')
    expect(p.length).to.be.eq(1)
  })

  it('shows 1 item', () => {
    props = {
      list: [{
        title: 'Odd job #1',
        _id: 0,
        showView: true,
        descriptions: [
          { title: 'Description', body: 'really long dumb stuff', id: 1212 },
          { title: 'Description', body: 'really long dumb stuff saldkfj aslkdfjlk aslkdfjllkj  laksdjf', id: 121234 },
          { title: 'Description', body: 'really long dumb stuff', id: 1213245 },
          { title: 'Description', body: 'really long dumb stuff', id: 12451 },
          { title: 'Description', body: 'really long dumb stuff', id: 123 }
        ],
        skills: ['Angular'],
        onDelete: console.log,
        onView: console.log,
        onEdit: console.log
      }]
    }
    const h6 = postingsComponent().find('h6')
    expect(h6.length).to.be.eq(1)
  })
})
