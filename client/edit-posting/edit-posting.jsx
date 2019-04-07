import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.min.css'
import PostingPage from '../components/posting-page'
import { api } from '../../backend/setup-functions'

class EditPosting extends Component {
  constructor (props) {
    super(props)

    this.state = {
      post: null,
      loading: true
    }
  }

  async componentWillMount () {
    try {
      let post = (await api['get-postings']({ _id: this.props.match.params.id }))[0]
      /* istanbul ignore next */
      this.setState({ post, loading: false })
    } catch (err) {
      console.error(err)
    }
  }

  render () {
    /* istanbul ignore else */
    if (this.state.loading) {
      return <div>We are retrieving data</div>
    } else {
      return <PostingPage pageTitle='Edit Post'
        title={this.state.post.title}
        skills={this.state.post.skills}
        description={this.state.post.description}
        contact={this.state.post.contactInfo}
        postId={this.props.match.params.id} />
    }
  }
}

export { EditPosting }
export default withRouter(EditPosting)
