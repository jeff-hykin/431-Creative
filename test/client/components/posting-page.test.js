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

  it('has a cancel button', () => {
    const wrapper = shallow(<PostingPage {...fakeProps} />)
    expect(wrapper.exists('#cancelButton')).to.equal(true)
  })

  it('has a save button', () => {
    const wrapper = shallow(<PostingPage {...fakeProps} />)
    expect(wrapper.exists('#saveButton')).to.equal(true)
  })

  describe('#goHome', () => {
    it('adds \'/\' to the history', () => {
      const wrapper = shallow(<PostingPage {...fakeProps} />)
      const instance = wrapper.instance()
      instance.goHome({ preventDefault: sinon.stub() })
      expect(instance.props.history).to.deep.equal(['/'])
    })
  })

  describe('#handleChange', () => {
    it('calls setState', () => {
      const wrapper = shallow(<PostingPage {...fakeProps} />)
      const instance = wrapper.instance()
      let stateSpy = sinon.spy(instance, 'setState')
      instance.handleChange(0)({ target: { value: 0 } })
      expect(stateSpy.called).to.equal(true)
      stateSpy.restore()
    })
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

    it('should set skillSnackBarOpen state to true when skill == \'\'', () => {
      const wrapper = shallow(<PostingPage {...fakeProps} />)
      const instance = wrapper.instance()
      instance.addSkill({})
      expect(instance.state.skillSnackBarOpen).to.equal(true)
    })
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
})
