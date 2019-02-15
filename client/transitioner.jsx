import React from 'react'
import { withStyles } from '@material-ui/core/styles';

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    // 
    // get initial className if there is one
    // 
    this.tranitions = props.tranitions
    let firstElement = this.tranitions.shift()
    if (typeof firstElement === 'string') {
      this.state.className = firstElement
    } else {
      this.state.className = ""
    }
  }
  
  transitionChange = () => {
    if (this.tranitions.length > 0) {
      let timeout = this.tranitions.shift()
      let className = this.tranitions.shift()
      setTimeout(async () => {
        // update the className after the timeout
        await this.setState({className})
        // stage the next timeout
        this.transitionChange()
      }, timeout);
    }
  }
  
  componentDidMount() {
    // start the chain of events
    this.transitionChange()
  }
  
  render() {
    return <this.props.component className={this.state.className+" "+this.props.perisitantClassName} {...this.props.otherProps}/>
  }
}