import React from 'react';
import { IonFooter } from '@ionic/react';

const Footer = () => {
  return (
    <IonFooter>
      <div className="ion-float-right ion-padding">
        <a
          href="https://github.com/riedel28/test-task"
          target="_blank"
          rel="noopener noreferrer"
          className="user-info-link"
        >
          Тестовое задание #3
        </a>{' '}
        | sergey.riedel@gmail.com
      </div>
    </IonFooter>
  );
};

export default Footer;
