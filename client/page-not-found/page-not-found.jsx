import React from 'react'
import MatrixParallax from 'react-matrix-parallax'
import Page from '../page'

const NotFound = () =>
  <div id='page-not-found' >
    <MatrixParallax color='black' backgroundColor='white' >
      <h2 className='404'>404</h2>
      <h5 style={{ maxWidth: '100vw', fontFamily: 'Consolas,monospace' }}>Page Not Found</h5>
    </MatrixParallax>
  </div>

export { NotFound }
export default Page(NotFound)
