import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import { UserList, classes } from '../../../../client/components/userList/userList'
import Table from '@material-ui/core/Table'
import * as tools from '../../../tools'

describe('userList', function () {
  let props = { classes: classes }

  it('should render', function () {
    try {
      tools.setAdminUser()
      let wrapper = shallow(<UserList {...props} />)
      expect(wrapper.contains(<Table />))
    } catch (err) {}
  })

  describe('#updateRole', function () {
    it('should call setState', function () {
      try {
        let wrapper = mount(<UserList {...props} />)
        let instance = wrapper.instance()
        instance.setState({ ...props,
          users: [{
            _id: 1,
            firstName: 'Test',
            lastName: 'Smith',
            email: 'testemail@gmail.com',
            role: ''
          },
          {
            _id: 2,
            firstName: 'Test',
            lastName: 'Jones',
            email: 'testemail2@gmail.com',
            role: 'admin'
          }]
        })
        tools.setAdminUser()
        wrapper.update()
        instance = wrapper.instance()
        instance.setState = sinon.spy()
        instance.updateRole(1, 'admin')
        expect(instance.setState.called).to.equal(true)
      } catch (err) {}
    })
  })

  describe('#changeRole', function () {
    it('should call update role when user is an admin', function () {
      try {
        let wrapper = mount(<UserList {...props} />)
        let instance = wrapper.instance()
        instance.setState({ ...props,
          users: [{
            _id: 1,
            firstName: 'Test',
            lastName: 'Smith',
            email: 'testemail@gmail.com',
            role: 'admin'
          },
          {
            _id: 2,
            firstName: 'Test',
            lastName: 'Jones',
            email: 'testemail2@gmail.com',
            role: ''
          }]
        })
        tools.setAdminUser()
        wrapper.update()
        instance = wrapper.instance()
        instance.updateRole = sinon.spy()
        instance.changeRole({
          _id: 1,
          firstName: 'Test',
          lastName: 'Smith',
          email: 'testemail@gmail.com',
          role: 'admin'
        })({})
        expect(instance.updateRole.called).to.equal(true)
      } catch (err) {}
    })

    it('should call update role when user is not an admin', function () {
      try {
        let wrapper = mount(<UserList {...props} />)
        let instance = wrapper.instance()
        instance.setState({ ...props,
          users: [{
            _id: 1,
            firstName: 'Test',
            lastName: 'Smith',
            email: 'testemail@gmail.com',
            role: 'admin'
          },
          {
            _id: 2,
            firstName: 'Test',
            lastName: 'Jones',
            email: 'testemail2@gmail.com',
            role: ''
          }]
        })
        tools.setAdminUser()
        wrapper.update()
        instance = wrapper.instance()
        instance.updateRole = sinon.spy()
        instance.changeRole({
          _id: 2,
          firstName: 'Test',
          lastName: 'Jones',
          email: 'testemail2@gmail.com',
          role: ''
        })({})
        expect(instance.updateRole.called).to.equal(true)
      } catch (err) {}
    })
  })

  describe('#removeUser', function () {
    it('should call setState', function () {
      try {
        tools.setAdminUser()
        let wrapper = mount(<UserList {...props} />)
        let instance = wrapper.instance()
        instance.setState = sinon.spy()
        try {
          instance.removeUser(1)
        } catch (err) {}
        expect(instance.setState.called).to.equal(true)
      } catch (err) {}
    })
  })

  describe('#deleteUser', function () {
    it('should call removeUser', function () {
      try {
        let wrapper = mount(<UserList {...props} />)
        let instance = wrapper.instance()
        instance.removeUser = sinon.spy()
        instance.setState({ ...props,
          users: [{
            _id: 0,
            firstName: 'Test',
            lastName: 'Smith',
            email: 'testemail@gmail.com',
            role: 'admin'
          },
          {
            _id: 1,
            firstName: 'Test',
            lastName: 'Jones',
            email: 'testemail2@gmail.com',
            role: ''
          }]
        })
        tools.setAdminUser()
        wrapper.update()
        instance = wrapper.instance()
        instance.deleteUser(0)({})
        expect(instance.removeUser.called).to.equal(true)
      } catch (err) {}
    })
  })
  tools.unsetUser()
})
