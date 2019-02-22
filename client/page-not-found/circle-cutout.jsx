import React from 'react'
import { makeStyles } from '@material-ui/styles'
// TODO:
// export color
// make child props
// add test
export const classes = {
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
  }
}
export const makeClasses = makeStyles(classes)

export default ({ cutoutColor = 'whitesmoke', circlePercent = 100 }) => {
  const internalClasses = makeClasses()
  return <React.Fragment>
    <div className={internalClasses.svgContainer}>
      <svg
        style={classes.svgStyle}
        viewBox='0 0 100 100'>
        <defs>
          <mask id='mask'>
            <rect fill='#FFF' height='100' width='100' />
            <circle cx='50%' cy='50%' r={`${circlePercent * 0.06}%`} />
          </mask>
        </defs>
        <rect height='100' mask='url(#mask)' fill={cutoutColor} fillOpacity='1' width='100' />
      </svg>
    </div>
    <div className={internalClasses.circleShadow} />
  </React.Fragment>
}
