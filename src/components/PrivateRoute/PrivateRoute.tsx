import React from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';

import { getAuthStatus } from '../../selectors/authSelectors';

const PrivateRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }: any) => {
        return rest.isLoggedIn === true ? (
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

const mapStateToProps = (state: any) => {
  return {
    isLoggedIn: getAuthStatus(state),
  };
};

export default connect(mapStateToProps)(PrivateRoute);
