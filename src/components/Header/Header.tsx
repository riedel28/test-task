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
import { logoGoogle } from 'ionicons/icons';

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
                <IonButton>Home</IonButton>
              </NavLink>
              <NavLink to="/news">
                <IonButton>News</IonButton>
              </NavLink>
              <NavLink to="/profile">
                <IonButton>Profile</IonButton>
              </NavLink>
            </div>

            <div className="login-info">
              {user && <span className="user-name">{user}</span>}
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
