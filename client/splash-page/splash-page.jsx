import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

export const classes = {
  'red-text': {
    unset: 'all',
    color: 'red'
  }
}

export default withStyles(classes)(class extends React.Component {
  constructor (props) {
    super(props)
    this.state = { colorOfButtonText: '' }
  }

  render () {
    return <div className={this.props.className}>
      <h1>Howdy</h1>
      Hello World
      <input placeholder='button text color' onChange={e => this.setState({ colorOfButtonText: e.target.value })} />
      <Button style={{ color: this.state.colorOfButtonText }} >
        <span className={this.props.classes['red-text']} >Test</span>
      </Button>
    </div>
  }
})
