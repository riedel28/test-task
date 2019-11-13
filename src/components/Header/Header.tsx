import React from 'react';
import { Link } from 'react-router-dom';
import { IonHeader, IonToolbar, IonTitle } from '@ionic/react';

const Header: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>Test Task</IonTitle>
      </IonToolbar>

      <div className="ion-padding-bottom">
        <div className="ion-padding-horizontal">
          <Link to="/">Home</Link>
          <Link to="/news">News</Link>
          <Link to="/profile">Profile</Link>
        </div>
      </div>
    </IonHeader>
  );
};

export default Header;
