import React from 'react';
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

export default () => (
  <IonPage>
    <IonContent>
      <IonGrid>
        <IonRow>
          <IonCol sizeMd="6" offsetMd="3" sizeLg="4" offsetLg="4">
            <div className="ion-padding">
              <h1>Login</h1>
            </div>
            <IonCard>
              <div className="ion-padding">
                <IonItem>
                  <IonLabel position="floating">Email</IonLabel>
                  <IonInput></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Password</IonLabel>
                  <IonInput></IonInput>
                </IonItem>

                <div className="ion-padding-top">
                  <IonButton expand="block">Submit</IonButton>
                </div>
              </div>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  </IonPage>
);
