import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router';
import { useSelector } from 'react-redux';

import { getAuthStatus } from '../../selectors/authSelectors';

interface PrivateRouteProps extends RouteProps {
  component: React.FC;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
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
              state: { from: location }
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
