import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import { PostingPage, classes } from '../../../client/components/posting-page'

describe('<PostingPage />', () => {
  let fakeProps = {
    classes: classes,
    history: [],
    state: {
      details: []
    }
  }

  before(function () {
    window.user = {}
  })

  it('has a cancel button', () => {
    const wrapper = shallow(<PostingPage {...fakeProps} />)
    expect(wrapper.exists('#cancelButton')).to.equal(true)
  })

  it('has a save button', () => {
    const wrapper = shallow(<PostingPage {...fakeProps} />)
    expect(wrapper.exists('#saveButton')).to.equal(true)
  })

  describe('#handleContactChange', () => {
    it('calls setState', () => {
      const wrapper = shallow(<PostingPage {...fakeProps} />)
      const instance = wrapper.instance()
      let stateSpy = sinon.spy(instance, 'setState')
      instance.handleContactChange('Grace')({ target: { value: 'Nicko' } })
      expect(stateSpy.called).to.equal(true)
      stateSpy.restore()
    })
  })

  describe('#addSkill', () => {
    it('should call setState when skill !== \'\'', () => {
      const wrapper = shallow(<PostingPage {...fakeProps} />)
      const instance = wrapper.instance()
      instance.setState({ newSkill: 'Python' })
      let stateSpy = sinon.spy(instance, 'setState')
      instance.addSkill({})
      expect(stateSpy.called).to.equal(true)
      stateSpy.restore()
    })

    // it('should not call setState when skill == \'\'', () => {
    //   const wrapper = shallow(<PostingPage {...fakeProps} />)
    //   const instance = wrapper.instance()
    //   let stateSpy = sinon.spy(instance, 'setState')
    //   instance.addSkill({})
    //   expect(stateSpy.called).to.equal(false)
    //   stateSpy.restore()
    // })
  })

  describe('#handleSkillDelete', () => {
    it('should call set state when deleting a skill', () => {
      const wrapper = shallow(<PostingPage {...fakeProps} />)
      const instance = wrapper.instance()
      instance.setState({ newSkill: 'Python' })
      instance.addSkill({})
      let stateSpy = sinon.spy(instance, 'setState')
      instance.handleSkillDelete('Python')()
      expect(stateSpy.called).to.equal(true)
      stateSpy.restore()
    })
  })
  //  describe.only('#savePosting', () => {
  //    it('should call makePosting', () => {
  //      const wrapper = shallow(<PostingPage {...fakeProps} />)
  //      const instance = wrapper.instance()
  //      api = sinon.stub()
  //      instance.savePosting({})
  //      api.resolve({})
  //      expect(api.called).to.equal(true)
  //      api.restore()
  //    })
  //  })

  after(function () {
    window.user = null
  })
})
