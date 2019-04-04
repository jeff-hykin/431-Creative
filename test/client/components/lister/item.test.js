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

  it('can click onView', () => {
    const mySpy = new MySpy()
    const mockCallBack = mySpy.fn()
    props = {
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
      _id: 0,
      showEdit: true,
      descriptions: [
        { title: 'Description', body: 'really long dumb stuff', id: 1212 },
        { title: 'Description', body: 'really long dumb stuff saldkfj aslkdfjlk aslkdfjllkj  laksdjf', id: 121234 },
        { title: 'Description', body: 'really long dumb stuff', id: 1213245 },
        { title: 'Description', body: 'really long dumb stuff', id: 12451 },
        { title: 'Description', body: 'really long dumb stuff', id: 123 }
      ],
      skills: ['Angular'],
      onEdit: mockCallBack,
      classes: {}
    }
    const item = itemComponent()
    item.find('button').last().simulate('click')
    expect(mySpy.calls).to.be.eq(1)
  })

  it('can click onDelete', () => {
    props = {
      title: 'Odd job #1',
      _id: 0,
      showDelete: true,
      descriptions: [
        { title: 'Description', body: 'really long dumb stuff', id: 1212 },
        { title: 'Description', body: 'really long dumb stuff saldkfj aslkdfjlk aslkdfjllkj  laksdjf', id: 121234 },
        { title: 'Description', body: 'really long dumb stuff', id: 1213245 },
        { title: 'Description', body: 'really long dumb stuff', id: 12451 },
        { title: 'Description', body: 'really long dumb stuff', id: 123 }
      ],
      skills: ['Angular'],
      onDelete: () => {},
      classes: {}
    }
    const item = itemComponent()
    item.find('button').last().simulate('click')
  })
})
