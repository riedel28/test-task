import React from 'react';
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from '@ionic/react';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="6" offsetMd="3">
              <div className="ion-padding">Home</div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
