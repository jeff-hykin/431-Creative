import React from 'react'
import { mount } from 'enzyme'

import { expect } from 'chai'
import { Item } from '../../../../client/components/lister/item'

function MySpy () {
  this.calls = 0
}
MySpy.prototype.fn = function () {
  return () => this.calls++
}

describe('<Item />', () => {
  let props
  let mountedItem
  const itemComponent = () => {
    if (!mountedItem) {
      mountedItem = mount(
        <Item {...props} />
      )
    }
    return mountedItem
  }

  beforeEach(() => {
    props = {
      classes: undefined
    }
    mountedItem = undefined
  })

  it('shows only view button on Item', () => {
    props = {
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
      onEdit: console.log,
      classes: {}
    }
    const svg = itemComponent().find('svg')
    expect(svg.length).to.be.eq(1)
  })

  it('can click onView', () => {
    const mySpy = new MySpy()
    const mockCallBack = mySpy.fn()
    props = {
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
      onView: mockCallBack,
      onEdit: console.log,
      classes: {}
    }
    const item = itemComponent()
    item.find('button').simulate('click')
    expect(mySpy.calls).to.be.eq(1)
  })

  it('can click onEdit', () => {
    const mySpy = new MySpy()
    const mockCallBack = mySpy.fn()
    props = {
      title: 'Odd job #1',
      id: 0,
      showEdit: true,
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
      onEdit: mockCallBack,
      classes: {}
    }
    const item = itemComponent()
    item.find('button').simulate('click')
    expect(mySpy.calls).to.be.eq(1)
  })

  it('can click onDelete', () => {
    const mySpy = new MySpy()
    const mockCallBack = mySpy.fn()
    props = {
      title: 'Odd job #1',
      id: 0,
      showDelete: true,
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
      onDelete: mockCallBack,
      classes: {}
    }
    const item = itemComponent()
    item.find('button').simulate('click')
    expect(mySpy.calls).to.be.eq(1)
  })
})
