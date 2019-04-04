import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'
import { expect, assert } from 'chai'
import ShowPostingPage, { ShowPosting } from '../../../client/show-posting/show-posting'
import sinon from 'sinon'
import dbFunctions from '../../../database/wrapper'
import utils from '../../../backend/utils'
import Card from '@material-ui/core/Card'

describe('<ShowPosting />', () => {
  let POST_ID

  before(async function () {
    await dbFunctions.connect()
    // Add user
    let email = 'testShowPosting@test.com'
    let result = await utils.createUser(email)
    assert.strictEqual(result['insertedCount'], 1, 'successfully inserted user')
    const USER_ID = result['ops'][0]._id

    // Add post
    result = await utils.createPost(USER_ID, 'TITLE', 'DESCRIPTION', {}, [], null)
    assert.strictEqual(result.result.ok, 1, 'successfully inserted post')
    POST_ID = result.upsertedId._id
  })

  it('to have post card', () => {
    const wrapper = mount(<Router><ShowPostingPage /></Router>)
    expect(wrapper.find(Card))
    wrapper.unmount()
  })

  it('componentWillMount gets called', () => {
    let spy = sinon.spy(ShowPosting.prototype, 'componentWillMount')
    const wrapper = mount(<ShowPosting match={{ params: { id: POST_ID } }} />)
    expect(spy.called).to.equal(true)
    wrapper.unmount()
  })

  it('loading message appears', () => {
    const wrapper = mount(<ShowPosting match={{ params: { id: POST_ID } }} />)
    wrapper.setState({ loading: true })
    expect(wrapper.contains(<div>We are retreiving data</div>))
    wrapper.unmount()
  })

  after(async function () {
    dbFunctions.close()
  })
})
