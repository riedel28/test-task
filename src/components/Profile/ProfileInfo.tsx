import React from 'react';
import { IonSpinner, IonLabel } from '@ionic/react';
import { useSelector } from 'react-redux';

import { getUser } from '../../selectors/authSelectors';
import dictionary from '../../dictionary';

const ProfileInfo = ({ error }: any) => {
  const user = useSelector(getUser);

  if (error) {
    return <IonLabel color="danger">{dictionary[error]}</IonLabel>;
  }

  return !user!.name ? (
    <div className="ion-justify-content-center ion-align-items-center ion-padding">
      <IonSpinner />
    </div>
  ) : (
    <div className="user-info">
      <p>
        <strong>{user!.name}</strong>
      </p>
    </div>
  );
};

export default ProfileInfo;
