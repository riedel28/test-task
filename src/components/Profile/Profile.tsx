import React from 'react';
import { IonPage, IonGrid, IonRow, IonCol, IonContent } from '@ionic/react';

export default () => (
  <IonPage>
    <IonContent>
      <IonGrid>
        <IonRow>
          <IonCol size="4" offsetMd="4">
            <div className="ion-padding">
              <h2>Profile</h2>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  </IonPage>
);
