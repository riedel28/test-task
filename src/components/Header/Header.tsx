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

const Header: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <div className="ion-padding-top">
          <IonTitle>Test Task</IonTitle>
        </div>
        <div className="ion-padding">
          <Link to="/">Home</Link>
          <Link to="/news">News</Link>
          <Link to="/profile">Profile</Link>
        </div>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
