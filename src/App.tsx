import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { IonApp, IonContent } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import '@ionic/react/css/core.css';
import '@ionic/react/css/ionic.bundle.css';

import Header from './components/Header/Header';
import News from './components/News/News';
import NewsItemPage from './components/News/NewsItemPage';
import CreateNews from './components/News/CreateNews';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import EditNewsItem from './components/News/EditNewsItem';
import Footer from './components/Footer/Footer';

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <Header />
        <IonContent>
          <Switch>
            <Route path="/" component={News} exact />
            <Route path="/news" component={News} exact />
            <Route path="/news/:id" component={NewsItemPage} />
            <Route path="/news/new" component={CreateNews} />
            <Route path="/news/edit/:id" component={EditNewsItem} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/profile" component={Profile} />
          </Switch>
        </IonContent>
        <Footer />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
