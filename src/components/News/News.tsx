import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
} from '@ionic/react';

export default () => (
  <IonPage>
    <IonContent>
      <IonList>
        <IonItem routerLink="/news/1">
          <IonLabel>User 1</IonLabel>
        </IonItem>
        <IonItem routerLink="/news/2">
          <IonLabel>User 2</IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  </IonPage>
);
