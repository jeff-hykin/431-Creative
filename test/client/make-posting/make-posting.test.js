import React from 'react'
import { shallow } from 'enzyme'
// import { BrowserRouter as Router } from 'react-router-dom'
import { expect } from 'chai'
import sinon from 'sinon'
import { MakePosting, classes } from '../../../client/make-posting/make-posting'
// import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'

describe('<MakePosting />', () => {
  let fakeProps = {
    classes: classes,
    history: [],
    state: {
      details: []
    }
  }

  it('has a cancel button', () => {
    const wrapper = shallow(<MakePosting {...fakeProps} />)
    expect(wrapper.exists('#cancelButton')).to.equal(true)
  })

  it('has a save button', () => {
    const wrapper = shallow(<MakePosting {...fakeProps} />)
    expect(wrapper.exists('#saveButton')).to.equal(true)
  })

  it('has the add icon', () => {
    const wrapper = shallow(<MakePosting {...fakeProps} />)
    expect(wrapper.contains(<AddIcon />)).to.equal(true)
  })

  it('changes the state when a card is added', () => {
    const wrapper = shallow(<MakePosting {...fakeProps} />)
    let stateSpy = sinon.spy(wrapper.instance(), 'setState')
    const instance = wrapper.instance()
    instance.addCard({})
    expect(stateSpy.called).to.equal(true)
    stateSpy.restore()
  })

  describe('#goHome', () => {
    it('adds \'/\' to the history', () => {
      const wrapper = shallow(<MakePosting {...fakeProps} />)
      const instance = wrapper.instance()
      instance.goHome({ preventDefault: sinon.stub() })
      expect(instance.props.history).to.deep.equal(['/'])
    })
  })

  describe('#handleChange', () => {
    it('calls setState', () => {
      const wrapper = shallow(<MakePosting {...fakeProps} />)
      const instance = wrapper.instance()
      let stateSpy = sinon.spy(instance, 'setState')
      instance.handleChange(0)({ target: { value: 0 } })
      expect(stateSpy.called).to.equal(true)
      stateSpy.restore()
    })
  })

  describe('#handleCardName', () => {
    it('calls setState', () => {
      const wrapper = shallow(<MakePosting {...fakeProps} />)
      const instance = wrapper.instance()
      let stateSpy = sinon.spy(instance, 'setState')
      instance.handleCardName(0)({ target: { value: 0 } })
      expect(stateSpy.called).to.equal(true)
      stateSpy.restore()
    })
  })

  describe('#handleCardDetail', () => {
    it('calls setState', () => {
      const wrapper = shallow(<MakePosting {...fakeProps} />)
      const instance = wrapper.instance()
      let stateSpy = sinon.spy(instance, 'setState')
      instance.handleCardDetail(0)({ target: { value: 0 } })
      expect(stateSpy.called).to.equal(true)
      stateSpy.restore()
    })
  })
})
