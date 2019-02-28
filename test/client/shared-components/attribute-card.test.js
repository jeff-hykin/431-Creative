// import { shallow } from 'enzyme'
// import React from 'react'
// import { expect } from 'chai'
// import AttributeCard from '../../../client/shared-components/attribute-card'

describe('<AttributeCard />', () => {
  it('contains the title of the card', () => {
    // Example: Skills
  })
  it('contains the description on the card', () => {
    // Example: List of skills
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
