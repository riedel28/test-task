import React from 'react';
import { IonSpinner, IonLabel } from '@ionic/react';
import { connect } from 'react-redux';

import { getUser } from '../../selectors/authSelectors';
import dictionary from '../../dictionary';

const ProfileInfo = ({ userName, error }: any) => {
  if (error) {
    return <IonLabel color="danger">{dictionary[error]}</IonLabel>;
  }

  return !userName ? (
    <div className="ion-justify-content-center ion-align-items-center ion-padding">
      <IonSpinner />
    </div>
  ) : (
    <div className="user-info">
      <p>
        <strong>{userName}</strong>
      </p>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userName: getUser(state).name,
  };
};

export default connect(mapStateToProps)(ProfileInfo);
