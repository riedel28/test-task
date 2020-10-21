import React from 'react';
import { Route, Redirect } from 'react-router';
import { useSelector } from 'react-redux';

import { getAuthStatus } from '../../selectors/authSelectors';

const PrivateRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  const isLoggedIn = useSelector(getAuthStatus);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isLoggedIn === true ? (
          <Component {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: '/news',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
