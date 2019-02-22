import React from 'react'
import { withStyles } from '@material-ui/styles'
import Matrix from '../global-components/matrix'
import CircleCutout from './circle-cutout'
// TODO: 
  // export color
  // make child props
  // add test

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
  moveableSquare: {
    flexDirection: 'column',
    fontSize: '3rem',
    backgroundColor: 'transparent',
    color: 'rgba(122, 229, 114, 0.87)',
    fontFamily: 'monospace',
    zIndex: '2',
    transition: 'margin 500ms cubic-bezier(.19,1,.06,.99) 0s',
  }
}

export default withStyles(classes)(class extends React.Component {
  static defaultProps = {
    parallaxRate: 2,
    cutoutColor: 'whitesmoke',
    circlePercent: 100,
    backgroundColor: 'rgba(0 ,0 ,0 , 1)',
    frontMatrixProps: {},
    backMatrixProps: {}
  };
  
  constructor (props) {
    super(props)
    this.state = {
      boxMarginTop: window.innerHeight / 2,
      boxMarginLeft: window.innerWidth / 2
    }
    
    this.forgroundMatrixParalaxFactor = this.props.parallaxRate
    this.boxChildrenParallaxRate = this.props.parallaxRate * 2
    this.backgroundParallaxRate = this.props.parallaxRate * 4
    
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

  mouseTrackingBox = () =>
    <div
      className={this.props.classes.moveableSquare}
      style={{
        marginLeft: this.state.boxMarginLeft / this.boxChildrenParallaxRate,
        marginTop: this.state.boxMarginTop / this.boxChildrenParallaxRate,
      }} >
      <h3>404</h3>
      Page Not Found
    </div>

  render () {
    return <div className={this.props.classes.fullWindow} >
      <CircleCutout />
      {/* Background matrix */}
      <Matrix
        style={{ ...classes.matrix,
          top: -this.state.boxMarginTop / this.backgroundParallaxRate,
          left: -this.state.boxMarginLeft / this.backgroundParallaxRate
        }}
        backgroundColor={this.props.backgroundColor}
        fontSize={11}
        frequency={0.001}
        fullscreen
        {...this.props.backMatrixProps}
      />
      <this.mouseTrackingBox />
      {/* Forground matrix */}
      <Matrix
        style={{ ...classes.matrix,
          top: -this.state.boxMarginTop / this.forgroundMatrixParalaxFactor,
          left: -this.state.boxMarginLeft / this.forgroundMatrixParalaxFactor
        }}
        backgroundColor='rgba(0,0,0,0)'
        fontSize={11}
        frequency={0.001}
        fullscreen
        zIndex={3}
        {...this.props.frontMatrixProps}
      />
    </div>
  }
})
