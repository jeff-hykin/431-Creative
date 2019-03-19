import { shallow } from 'enzyme'
import React from 'react'
import { expect } from 'chai'
import AttributeCard from '../../../client/shared-components/attribute-card'

describe('<AttributeCard />', () => {
  let fakeProps = {
    title: 'Skills',
    description: ['Python, Ruby, C'],
    edit: false
  }
  it('contains the title of the card', () => {
    // Example: Skills
    let wrapper = shallow(<AttributeCard {...fakeProps} />)
    expect(wrapper.contains(<h5>{fakeProps.title}</h5>)).to.equal(true)
  })
  it('contains the description on the card', () => {
    // Example: List of skills
    let wrapper = shallow(<AttributeCard {...fakeProps} />)
    expect(wrapper.contains(<p>{fakeProps.description}</p>)).to.equal(true)
  })
  describe('Editing mode', () => {
    it('has a submit button', () => {
      // to finalize the changes that were made to the card
    })
    it('has a delete button', () => {
      // a red X in the mockups, removes the card and data
    })
    it('allows you to change the text', () => {
    })
  })
  describe('non editing mode', () => {
    describe('logged in user who created the card', () => {
      it('has edit button', () => {
        // a pencil in the mockups, should change the state of the card to editing mode
      })
      it('does not have a delete button', () => {
      })
      it('does not allow you to change the text', () => {
      })
    })
    describe('non logged in/ non owner view', () => {
      it('does not have an editing button', () => {
      })
      it('does not have a delete button', () => {
      })
      it('does not allow you to change the text', () => {
      })
    })
  })
})
