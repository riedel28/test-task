import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { IonHeader, IonRow, IonCol, IonButton, IonIcon } from '@ionic/react';
import {
  homeOutline,
  newspaperOutline,
  personCircleOutline,
  createOutline,
  logoGoogle,
} from 'ionicons/icons';

import { useSelector, useDispatch } from 'react-redux';

import { handleLogin } from '../../actions/handleLogin';
import { handleLogout } from '../../actions/handleLogout';
import { getAuthStatus, getUser } from '../../selectors/authSelectors';

const Header: React.FC = () => {
  const user = useSelector(getUser);
  const isLoggedIn = useSelector(getAuthStatus);
  const dispatch = useDispatch();

  const onLogin = useCallback(() => {
    dispatch(handleLogin());
  }, [dispatch]);

  const onLogout = useCallback(() => {
    dispatch(handleLogout());
  }, [dispatch]);

  return (
    <IonHeader>
      <IonRow>
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
                <IonButton onClick={isLoggedIn ? onLogout : onLogin}>
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

export default Header;
