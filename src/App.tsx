import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import News from './components/News/News';
import Profile from './components/Profile/Profile';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <Header />
        <IonContent>
          <IonRouterOutlet>
            <Route path="/" component={Home} exact={true} />
            <Route path="/news" component={News} />
            <Route path="/profile" component={Profile} />
          </IonRouterOutlet>
        </IonContent>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
