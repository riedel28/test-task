import React from 'react';
import { Link } from 'react-router-dom';
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

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="ion-padding">Home</div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
