import React from 'react'
import CircleCutout from '../global-components/circle-cutout'
import MatrixParallax from './matrix-parallax'

export default () =>
  <React.Fragment>
    <CircleCutout />
    <MatrixParallax>
      <h2>404</h2>
      <h5 style={{ maxWidth: '100vw' }}>Page Not Found</h5>
    </MatrixParallax>
  </React.Fragment>
