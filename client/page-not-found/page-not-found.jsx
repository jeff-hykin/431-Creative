import React from 'react'
import { withStyles } from '@material-ui/styles'
import Matrix from '../global-components/matrix'

export const classes = {
  fullWindow: {
    width: '100vw',
    height: '100vh',
    justifyContent: 'center',
    justifyItems: 'center'
  },
  matrix: {
    position: 'fixed',
    zIndex: '-1',
    transform: 'scale(1.2)'
  },
  circleShadow: {
    position: 'fixed',
    borderRadius: '69vh',
    boxShadow: 'inset 0 0 3rem rgba(0, 0, 0, 0.87)',
    width: '101vh',
    height: '101vh',
    pointerEvents: 'none',
    marginTop: '7px',
    zIndex: 1,
    marginLeft: '1px'
  },
  svgContainer: {
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 5
  },
  svgStyle: {
    height: '800vh',
    minWidth: '800vh',
    position: 'relative',
    left: '0vw',
    top: '0',
    overflow: 'hidden',
    pointerEvents: 'none'
  },
  moveableSquare: {
    height: '7rem',
    width: '7rem',
    fontSize: '2rem',
    backgroundColor: 'whitesmoke',
    color: 'black',
    boxShadow: '3px 3px 4px 0px rgba(0, 0, 0, 0.47)',
    zIndex: '2'
  }
}

export default withStyles(classes)(class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      boxMarginTop: window.innerHeight / 2,
      boxMarginLeft: window.innerWidth / 2
    }
    this.bodyListener = document.body.addEventListener('mousemove', (e) => {
      let centerX = window.innerWidth / 2
      let centerY = window.innerHeight / 2
      let distanceFromCenterY = e.pageY - centerY
      let distanceFromCenterX = e.pageX - centerX
      this.setState({ boxMarginTop: distanceFromCenterY, boxMarginLeft: distanceFromCenterX })
    })
  }

  componentWillUnmount () {
    // clean up by removing the listener
    document.body.removeEventListener('mousemove', this.bodyListener)
  }

  circleCutout = () =>
    <div className={this.props.classes.svgContainer}>
      <svg
        style={classes.svgStyle}
        viewBox='0 0 100 100'>
        <defs>
          <mask id='mask'>
            <rect fill='#FFF' height='100' width='100' />
            <circle cx='50%' cy='50%' r='6%' />
          </mask>
        </defs>
        <rect height='100' mask='url(#mask)' fill='#FFF' fillOpacity='1' width='100' />
      </svg>
    </div>

  mouseTrackingBox = () =>
    <div className={this.props.classes.moveableSquare} style={{ marginLeft: this.state.boxMarginLeft, marginTop: this.state.boxMarginTop }} >
      404
    </div>

  render () {
    let backgroundMovementFactor = 10
    return <div className={this.props.classes.fullWindow} >
      <this.circleCutout />
      <div className={this.props.classes.circleShadow} />
      <this.mouseTrackingBox />
      <Matrix style={{ ...classes.matrix, top: -this.state.boxMarginTop / backgroundMovementFactor, left: -this.state.boxMarginLeft / backgroundMovementFactor }} fullscreen />
    </div>
  }
})
