import React from 'react';
import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonContent } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import News from './components/News/News';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';

import '@ionic/react/css/core.css';
import '@ionic/react/css/ionic.bundle.css';

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <Header />
        <IonContent>
          <IonRouterOutlet>
            <Route path="/" component={Home} exact={true} />
            <Route path="/news" component={News} />
            <Route path="/profile" component={Login} />
            <Route path="/login" component={Login} />
          </IonRouterOutlet>
        </IonContent>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
