import React from 'react';
import { IonSpinner, IonLabel } from '@ionic/react';
import { connect } from 'react-redux';

import dictionary from '../../dictionary';

const ProfileInfo = ({ userName, isLoading, error }: any) => {
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
        {/* <span>{profileInfo.city}</span> */}
      </p>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userName: state.auth.user.name,
  };
};

export default connect(mapStateToProps)(ProfileInfo);
