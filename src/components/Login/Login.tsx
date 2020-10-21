import React, { useState } from 'react';
import {
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonItem,
  IonCard,
  IonInput,
  IonLabel,
  IonButton,
  IonSpinner,
} from '@ionic/react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleLogin } from '../../actions/handleLogin';
import dictionary from '../../dictionary';
import {
  getAuthStatus,
  getAuthLoadingStatus,
  getAuthError,
} from '../../selectors/authSelectors';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLoggedIn = useSelector(getAuthStatus);
  const isLoading = useSelector(getAuthLoadingStatus);
  const error = useSelector(getAuthError);
  const dispatch = useDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    dispatch(handleLogin());

    setPassword('');
  };

  if (isLoggedIn) {
    return <Redirect to="/profile" />;
  }

  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol
              sizeSm="8"
              offsetSm="2"
              sizeMd="6"
              offsetMd="3"
              sizeLg="4"
              offsetLg="4"
            >
              <div className="ion-padding-horizontal ion-padding-bottom">
                <h1>Login</h1>
                {error && (
                  <IonLabel color="danger">{dictionary[error]}</IonLabel>
                )}
              </div>
              <IonCard>
                <div className="ion-padding">
                  <form onSubmit={handleSubmit}>
                    <div className="ion-padding-bottom">
                      <IonItem>
                        <IonLabel position="floating">Username</IonLabel>
                        <IonInput
                          type="email"
                          value={email}
                          onIonChange={(e: any) => setEmail(e.target.value)}
                          required
                        />
                      </IonItem>
                      <IonItem>
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput
                          type="password"
                          value={password}
                          onIonChange={(e: any) => setPassword(e.target.value)}
                          required
                        />
                      </IonItem>
                    </div>

                    <div className="ion-padding-top">
                      <IonButton
                        expand="block"
                        onClick={handleSubmit}
                        disabled={email === '' && password === ''}
                      >
                        {isLoading ? <IonSpinner /> : 'Submit'}
                      </IonButton>
                    </div>
                  </form>
                </div>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
