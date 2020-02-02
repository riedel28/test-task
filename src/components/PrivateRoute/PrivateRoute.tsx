import React from 'react';
import { Route, Redirect } from 'react-router';

interface PrivateRouteProps {
  component: React.ReactType;
  isLoggedIn: boolean;
  path: string | string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...props
}) => {
  return (
    <Route
      {...props}
      render={(props: any) =>
        props.isLoggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
