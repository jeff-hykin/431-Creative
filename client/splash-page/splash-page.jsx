import React from 'react'
import Button from '@material-ui/core/Button'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = { colorOfButtonText: '' }
  }

  render () {
    return <div className={this.props.className}>
      <h1>Howdy</h1>
      Hello World
      <input placeholder='button color' onChange={e => this.setState({ colorOfButtonText: e.target.value })} />
      <Button style={{ color: this.state.colorOfButtonText }} >
            Emotion
      </Button>
    </div>
  }
}
