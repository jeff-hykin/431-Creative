import React from 'react'

export default (class extends React.Component {
  constructor (props) {
    super(props)
    this.state = { edit: props.edit }
  }
  render () {
    return (
      <div id='attribute-card'>
        <h5>{this.props.title}</h5>
        <p>{this.props.description}</p>
      </div>
    )
  }
})
