import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { store } from './context/store'

const PrivateRoute = ({ component: Component, ...rest }) => {

  const context = useContext(store);
  const { isAuthed } = context.state; 

  return (
    <Route
      {...rest}
      render={props =>
        isAuthed ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute