import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PostingPage from '../components/posting-page'

class MakePosting extends Component {
  render () {
    return <PostingPage pageTitle='Edit Post'
      contact={{
        email: window.user.email,
        company: window.user.firstName + ' ' + window.user.lastName,
        phone: '',
        linkedin: ''
      }}
      postId={this.props.match.params.id} />
  }
}

export { MakePosting }
export default withRouter(MakePosting)
