import React from 'react';
import { IonPage, IonGrid, IonRow, IonCol, IonContent } from '@ionic/react';

import ProfileInfo from './ProfileInfo';

const Profile: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol sizeSm="6">
              <div className="ion-padding-horizontal">
                <h1>Profile</h1>
                <ProfileInfo />
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
