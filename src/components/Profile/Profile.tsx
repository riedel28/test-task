import React, { useEffect } from 'react';
import { IonPage, IonGrid, IonRow, IonContent } from '@ionic/react';
import { connect } from 'react-redux';
import { fetchUserData } from '../../actions';

const Profile = ({ user: userId, fetchUserData, userInfo, error }: any) => {
  useEffect(() => {
    fetchUserData(userId);
  }, [fetchUserData, userId]);

  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow>
            <div className="ion-padding-horizontal">
              <h1>Profile</h1>
              {error && <p>{error}</p>}
              <p>{userId}</p>
            </div>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
    userInfo: state.userInfo,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchUserData: (id: any) => dispatch(fetchUserData(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
