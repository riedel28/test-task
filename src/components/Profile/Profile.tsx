import React from 'react';
import { IonPage, IonGrid, IonRow, IonCol, IonContent } from '@ionic/react';

import UserInfo from './UserInfo';

const Profile = () => {
  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol sizeSm="4">
              <div className="ion-padding-horizontal">
                <h1>Profile</h1>
                <UserInfo />
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
