import React from 'react'
import MatrixParallax from 'react-matrix-parallax'

export default () =>
  <div id='page-not-found' >
    <div style={{ position: 'relative', zIndex: 5, textAlign: 'center' }}>
      <p><h2>404</h2></p>
      <p><h5 style={{ maxWidth: '100vw', fontFamily: 'Consolas,monospace' }}>Page Not Found</h5></p>
    </div>
    <MatrixParallax color='black' backgroundColor='white' >
    </MatrixParallax>
  </div>
