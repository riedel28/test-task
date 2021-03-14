import React from 'react';
import { IonSpinner, IonLabel } from '@ionic/react';
import { useSelector } from 'react-redux';

import { getUser, getAuthError } from '../../selectors/authSelectors';
import dictionary from '../../dictionary';

const ProfileInfo: React.FC = () => {
  const user = useSelector(getUser);
  const error = useSelector(getAuthError);

  if (error) {
    return <IonLabel color="danger">{dictionary[error.message]}</IonLabel>;
  }

  return !user?.name ? (
    <div className="ion-justify-content-center ion-align-items-center ion-padding">
      <IonSpinner />
    </div>
  ) : (
    <div className="user-info">
      <p>
        <strong>{user?.name}</strong>
      </p>
    </div>
  );
};

export default ProfileInfo;
