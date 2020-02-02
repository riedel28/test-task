import React from 'react';
import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonContent } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { connect } from 'react-redux';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import News from './components/News/News';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';

import '@ionic/react/css/core.css';
import '@ionic/react/css/ionic.bundle.css';

const App: React.FC = ({ isLoggedIn }: any) => {
  return (
    <IonApp>
      <IonReactRouter>
        <Header />
        <IonContent>
          <IonRouterOutlet>
            <Route path="/" component={Home} exact={true} />
            <Route path="/news" component={News} />
            <Route path="/login" component={Login} />
            <Route path={'/profile'} component={isLoggedIn ? Profile : Login} />
          </IonRouterOutlet>
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
