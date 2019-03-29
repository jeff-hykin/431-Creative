import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.min.css'
import PostingPage from '../components/posting-page'

class MakePosting extends Component {
  render () {
    return <PostingPage pageTitle='Make a Posting' />
  }
}

export { MakePosting }
export default withRouter(MakePosting)
