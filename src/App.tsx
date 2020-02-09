import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { IonApp, IonContent } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { connect } from 'react-redux';

import '@ionic/react/css/core.css';
import '@ionic/react/css/ionic.bundle.css';

import Header from './components/Header/Header';
import News from './components/News/News';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const App: React.FC = ({ isLoggedIn }: any) => {
  return (
    <IonApp>
      <IonReactRouter>
        <Header />
        <IonContent>
          <Switch>
            <Route path="/" component={News} exact />
            <Route path="/news" component={News} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/profile" component={Profile} />
          </Switch>
        </IonContent>
      </IonReactRouter>
    </IonApp>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps)(App);
