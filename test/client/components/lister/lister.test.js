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
    const p = postingsComponent().find('p')
    expect(p.length).to.be.eq(1)
  })

  it('shows 1 item', () => {
    props = {
      list: [{
        title: 'Odd job #1',
        id: 0,
        showView: true,
        descriptions: [
          { title: 'Description', body: 'really long dumb stuff', id: 1212 },
          { title: 'Description', body: 'really long dumb stuff saldkfj aslkdfjlk aslkdfjllkj  laksdjf', id: 121234 },
          { title: 'Description', body: 'really long dumb stuff', id: 1213245 },
          { title: 'Description', body: 'really long dumb stuff', id: 12451 },
          { title: 'Description', body: 'really long dumb stuff', id: 123 }
        ],
        skills: [
          { key: 222, label: 'Angular' },
          { key: 11212, label: 'jQuery' },
          { key: 2234234, label: 'Polymer' },
          { key: 3234, label: 'React' },
          { key: 234, label: 'Vue.js' }
        ],
        onDelete: console.log,
        onView: console.log,
        onEdit: console.log
      }]
    }
    const h2 = postingsComponent().find('h2')
    expect(h2.length).to.be.eq(1)
  })
})
