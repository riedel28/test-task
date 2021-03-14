import React from 'react';
import { IonFooter } from '@ionic/react';

const Footer: React.FC = () => {
  return (
    <IonFooter>
      <div className="ion-float-right ion-padding">
        <a
          href="https://github.com/riedel28/test-task"
          target="_blank"
          rel="noopener noreferrer"
          className="user-info-link"
        >
          Test task #3
        </a>{' '}
        |{' '}
        <a
          href="https://github.com/riedel28"
          target="_blank"
          rel="noopener noreferrer"
          className="user-info-link"
        >
          Github: riedel28
        </a>
      </div>
    </IonFooter>
  );
};

export default Footer;
