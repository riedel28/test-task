import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
} from '@ionic/react';
import {
  homeOutline,
  newspaperOutline,
  personCircleOutline,
  createOutline,
  logoGoogle,
} from 'ionicons/icons';

import { connect } from 'react-redux';

import { handleLogin } from '../../actions/handleLogin';
import { handleLogout } from '../../actions/handleLogout';

const Header: React.FC = ({
  isLoggedIn,
  handleLogout,
  user,
  handleLogin,
}: any) => {
  useEffect(() => {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      });
    });
  }, []);

  return (
    <IonHeader>
      <IonRow>
        <IonCol sizeXs="12" sizeSm="12">
          <IonToolbar>
            <IonTitle>
              <h3>Test Task</h3>
            </IonTitle>
          </IonToolbar>
        </IonCol>
        <IonCol sizeXs="12" sizeSm="12">
          <nav>
            <div>
              <NavLink to="/">
                <IonButton>
                  <IonIcon icon={homeOutline} slot="start" />
                  Home
                </IonButton>
              </NavLink>
              <NavLink to="/news">
                <IonButton>
                  <IonIcon icon={newspaperOutline} slot="start" />
                  News
                </IonButton>
              </NavLink>
              {isLoggedIn && (
                <NavLink to="/profile">
                  <IonButton>
                    <IonIcon icon={personCircleOutline} slot="start" />
                    Profile
                  </IonButton>
                </NavLink>
              )}
              {isLoggedIn && (
                <NavLink to="/news/new">
                  <IonButton>
                    <IonIcon icon={createOutline} slot="start" />
                    New Post
                  </IonButton>
                </NavLink>
              )}
            </div>

            <div className="login-info">
              {user && <span className="user-name">{user.name}</span>}
              <NavLink to="/">
                <IonButton onClick={isLoggedIn ? handleLogout : handleLogin}>
                  {!isLoggedIn ? (
                    <IonIcon icon={logoGoogle} slot="start" />
                  ) : null}
                  {isLoggedIn ? 'Log Out' : 'Log In with Google'}
                </IonButton>
              </NavLink>
            </div>
          </nav>
        </IonCol>
      </IonRow>
    </IonHeader>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleLogin: () => dispatch(handleLogin()),
    handleLogout: () => dispatch(handleLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
