import React from 'react';
import { IonPage, IonGrid, IonRow, IonContent } from '@ionic/react';
import { connect } from 'react-redux';

const Profile = ({ user }: any) => {
  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow>
            <div className="ion-padding">
              <h1>Profile</h1>
              <p>{user}</p>
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
  };
};

export default connect(mapStateToProps)(Profile);
