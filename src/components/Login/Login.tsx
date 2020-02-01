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
} from '@ionic/react';
import { connect } from 'react-redux';
import { logIn } from '../../actions';

const Login = ({ logIn, error }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    logIn(username, password);

    setUsername('');
    setPassword('');
  };

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
                  <IonLabel color="danger">Логин или пароль неверные</IonLabel>
                )}
              </div>
              <IonCard>
                <div className="ion-padding">
                  <form onSubmit={handleSubmit}>
                    <IonItem>
                      <IonLabel position="floating">Username</IonLabel>
                      <IonInput
                        value={username}
                        onIonChange={(e: any) => setUsername(e.target.value)}
                      />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="floating">Password</IonLabel>
                      <IonInput
                        value={password}
                        onIonChange={(e: any) => setPassword(e.target.value)}
                      />
                    </IonItem>

                    <div className="ion-padding-top">
                      <IonButton
                        expand="block"
                        onClick={handleSubmit}
                        disabled={username === '' && password === ''}
                      >
                        Submit
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

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
    isLoggedIn: state.isLoggedIn,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    logIn: (username: any, password: any) =>
      dispatch(logIn(username, password)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
