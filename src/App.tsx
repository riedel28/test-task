import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { IonApp, IonContent } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import '@ionic/react/css/core.css';
import '@ionic/react/css/ionic.bundle.css';

import Header from './components/Header/Header';
import Feed from './components/Feed/Feed';
import ShowPost from './components/Feed/ShowPost';
import CreatePost from './components/Feed/CreatePost';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import EditPost from './components/Feed/EditPost';
import Footer from './components/Footer/Footer';
import NotFound from './components/NotFound/NotFound';

const App: React.FC = () => {
  useEffect(() => {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      });
    });
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <Header />
        <IonContent>
          <Switch>
            <Route path="/" component={Feed} exact />
            <Route path="/news" component={Feed} exact />
            <Route path="/news/new" component={CreatePost} exact />
            <Route path="/news/:id" component={ShowPost} exact />
            <PrivateRoute path="/news/edit/:id" component={EditPost} exact />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route path="*" component={NotFound} />
          </Switch>
        </IonContent>
        <Footer />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
