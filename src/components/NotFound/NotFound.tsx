import React from 'react';
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from '@ionic/react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol
              sizeMd="8"
              offsetMd="2"
              sizeLg="6"
              offsetLg="3"
              className="ion-padding-top"
            >
              <div className="ion-text-center">
                <h2>Страница не найдена</h2>
                <Link to="/">Вернуться на главную</Link>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default NotFound;