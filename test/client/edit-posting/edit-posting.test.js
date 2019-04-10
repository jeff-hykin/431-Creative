import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'
import { expect, assert } from 'chai'
import EditPostingPage, { EditPosting } from '../../../client/edit-posting/edit-posting'
import PostingPage from '../../../client/components/posting-page'
import sinon from 'sinon'
import dbFunctions from '../../../database/wrapper'
import utils from '../../../backend/utils'

describe('<EditPosting />', () => {
  let POST_ID

  before(async function () {
    await dbFunctions.connect()
    // Add user
    let email = 'test1@test.com'
    let result = await utils.createUser(email)
    assert.strictEqual(result['insertedCount'], 1, 'successfully inserted user')
    const USER_ID = result['ops'][0]._id

    // Add post
    result = await utils.createPost(USER_ID, 'TITLE', 'DESCRIPTION', {}, [], null)
    assert.strictEqual(result.result.ok, 1, 'successfully inserted post')
    POST_ID = result.upsertedId._id
  })

  it('to have a posting page', () => {
    const wrapper = mount(<Router><EditPostingPage /></Router>)
    expect(wrapper.find(PostingPage))
    wrapper.unmount()
  })

  it('componentWillMount gets called', () => {
    let spy = sinon.spy(EditPosting.prototype, 'componentWillMount')
    const wrapper = mount(<EditPosting match={{ params: { id: POST_ID } }} />)
    expect(spy.called).to.equal(true)
    wrapper.unmount()
  })

  it('loading message appears', () => {
    const wrapper = mount(<EditPosting match={{ params: { id: POST_ID } }} />)
    wrapper.setState({ loading: true })
    expect(wrapper.contains(<div>We are retrieving data</div>))
    wrapper.unmount()
  })

  after(async function () {
    dbFunctions.close()
  })
})
