import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PostingPage from '../components/posting-page'

class MakePosting extends Component {
  render () {
    return <PostingPage pageTitle='Make a Posting' />
  }
}

export { MakePosting }
export default withRouter(MakePosting)
