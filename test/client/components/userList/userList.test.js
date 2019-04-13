import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import { UserList, classes } from '../../../../client/components/userList/userList'
import Table from '@material-ui/core/Table'
import * as tools from '../../../tools'

describe('userList', function () {
  let props = { classes: classes, history: [] }
  tools.setAdminUser()

  it('should render', function () {
    let wrapper = shallow(<UserList {...props} />)
    expect(wrapper.contains(<Table />))
  })

  describe('#updateRole', function () {
    it('should call setState', function () {
      let wrapper = mount(<UserList {...props} />)
      let instance = wrapper.instance()
      instance.setState({ ...props,
        users: [{
          _id: 0,
          firstName: 'Test',
          lastName: 'Smith',
          email: 'testemail@gmail.com',
          role: ''
        },
        {
          _id: 1,
          firstName: 'Test',
          lastName: 'Jones',
          email: 'testemail2@gmail.com',
          role: 'admin'
        }]
      })
      wrapper.update()
      instance = wrapper.instance()
      instance.setState = sinon.spy()
      instance.updateRole(0, 'admin')
      expect(instance.setState.called).to.equal(true)
    })
  })

  describe('#changeRole', function () {
    it('should call update role when user is an admin', function () {
      let wrapper = mount(<UserList {...props} />)
      let instance = wrapper.instance()
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
      wrapper.update()
      instance = wrapper.instance()
      instance.updateRole = sinon.spy()
      instance.changeRole({
        _id: 0,
        firstName: 'Test',
        lastName: 'Smith',
        email: 'testemail@gmail.com',
        role: 'admin'
      })({})
      expect(instance.updateRole.called).to.equal(true)
    })

    it('should call update role when user is not an admin', function () {
      let wrapper = mount(<UserList {...props} />)
      let instance = wrapper.instance()
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
      wrapper.update()
      instance = wrapper.instance()
      instance.updateRole = sinon.spy()
      instance.changeRole({
        _id: 1,
        firstName: 'Test',
        lastName: 'Jones',
        email: 'testemail2@gmail.com',
        role: ''
      })({})
      expect(instance.updateRole.called).to.equal(true)
    })
  })

  describe('#removeUser', function () {
    it('should call setState', function () {
      let wrapper = mount(<UserList {...props} />)
      let instance = wrapper.instance()
      instance.setState = sinon.spy()
      try {
        instance.removeUser(1)
      } catch (err) {}
      expect(instance.setState.called).to.equal(true)
    })
  })

  describe('#deleteUser', function () {
    it('should call removeUser', function () {
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
      wrapper.update()
      instance = wrapper.instance()
      instance.deleteUser(0)({})
      expect(instance.removeUser.called).to.equal(true)
    })
  })

  tools.unsetUser()
})
