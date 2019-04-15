import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
// import { BrowserRouter as Router } from 'react-router-dom'
import sinon from 'sinon'
import * as tools from '../../tools'
import { DashboardHelper, classes, TableHelper } from '../../../client/dashboard/dashboard'
import Button from '@material-ui/core/Button'

describe('<Dashboard />', () => {
  let props = {
    classes: classes,
    history: []
  }

  describe('<TabHelper />', function () {
    describe('#switchTab', function () {
      it('should call set state', function () {
        tools.setAdminUser()
        const wrapper = mount(<TableHelper {...props} />)
        let instance = wrapper.instance()
        instance.setState = sinon.spy()
        instance.switchTab()
        expect(instance.setState.called).to.equal(true)
        tools.unsetUser()
      })
    })
  })

  it('has clickable buttons that dont crash', () => {
    tools.setNormalUser()

    const wrapper = mount(<DashboardHelper {...props} />)

    for (let i = 0; i < wrapper.find(Button).length; i++) {
      wrapper.find(Button).at(i).simulate('click')
    }

    tools.unsetUser()
    wrapper.unmount()
  })

  describe('#navigateToPostings', function () {
    it('should add postings to the history', function () {
      tools.setNormalUser()
      const wrapper = mount(<DashboardHelper {...props} />)
      let instance = wrapper.instance()
      instance.navigateToPostings({ preventDefault: function () {} })
      expect(instance.props.history[instance.props.history.length - 1]).to.equal('/postings')
      tools.unsetUser()
      wrapper.unmount()
    })
  })

  describe('#switchTab', function () {
    it('should switch to account tab when on admin tab', function () {
      tools.setAdminUser()
      const wrapper = mount(<DashboardHelper {...props} />)
      let instance = wrapper.instance()
      instance.setState = sinon.spy()
      instance.switchTab()
      expect(instance.setState.called).to.equal(true)
      tools.unsetUser()
      wrapper.unmount()
    })

    it('should switch to admin tab when on account', function () {
      tools.setAdminUser()
      const wrapper = mount(<DashboardHelper {...props} />)
      let instance = wrapper.instance()
      instance.setState({ tab: 'Account' })
      instance.setState = sinon.spy()
      instance.switchTab()
      expect(instance.setState.called).to.equal(true)
      tools.unsetUser()
      wrapper.unmount()
    })
  })
})
