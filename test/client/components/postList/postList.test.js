import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import { PostList, classes } from '../../../../client/components/postList/postList'
import Table from '@material-ui/core/Table'
import * as tools from '../../../tools'

describe.skip('postList', function () {
  let props = { classes: classes, history: [] }
  tools.setAdminUser()

  it('should render', function () {
    let wrapper = shallow(<PostList {...props} />)
    expect(wrapper.contains(<Table />))
  })

  describe('#removePost', function () {
    it('should call setState', function () {
      let wrapper = mount(<PostList {...props} />)
      let instance = wrapper.instance()
      instance.setState = sinon.spy()
      try {
        instance.removePost(1)
      } catch (err) {}
      expect(instance.setState.called).to.equal(true)
    })
  })

  describe('#deletePost', function () {
    it('should call removePost', function () {
      let wrapper = mount(<PostList {...props} />)
      let instance = wrapper.instance()
      instance.removePost = sinon.spy()
      instance.setState({ ...props,
        posts: [{
          _id: 0,
          title: 'test post',
          description: 'test description',
          email: 'testemail@gmail.com'
        }]
      })
      wrapper.update()
      instance = wrapper.instance()
      instance.deletePost(0)({})
      expect(instance.removePost.called).to.equal(true)
    })
  })

  describe('#navigateToPost', function () {
    it('should push the post id to the history', function () {
      let wrapper = mount(<PostList {...props} />)
      let instance = wrapper.instance()
      instance.navigateToPost(0)({ preventDefault: function () {} })
      expect(instance.props.history).to.deep.equal(['/showposting/0'])
    })
  })
  tools.unsetUser()
})
