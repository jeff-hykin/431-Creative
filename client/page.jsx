// transitioner adds page animations when the page is loaded
import { Route } from 'react-router-dom'
import Transitioner from './transitioner'
import React from 'react'

// this is a wrapper for the route so that we dont have to write out "<Transitioner ..." for every single page
export let Page = ({ path, component, routeProps, componentProps }) => (<Route
  exact={path != null}
  path={path}
  render={(props) =>
    <Transitioner
      perisitantClassName={componentProps.classes.page}
      tranitions={[componentProps.classes.pageNotLoaded, 0, componentProps.classes.pageFullyLoaded]}
      component={component}
      componentProps={componentProps}
      {...props}
    />
  }
  {...routeProps}
/>)

export default Page
