import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IonButton, IonIcon, IonAlert, IonItemDivider } from '@ionic/react';
import { createOutline, trashOutline } from 'ionicons/icons';

import displayDateTime from './../../helpers/displayDateTime';

const NewsItem = ({
  title,
  children,
  creator,
  createdAt,
  id,
  onDelete,
  isLoggedIn,
}: any) => {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <>
      <NavLink to={`/news/${id}`}>
        <h2>{title}</h2>
      </NavLink>

      <div className="post-description">
        <div>
          <span className="creator">{creator.displayName}</span> ·{' '}
          <span className="created-at">{displayDateTime(createdAt)}</span>
        </div>

        <div>
          {isLoggedIn && (
            <>
              <NavLink to={`/news/edit/${id}`}>
                <IonButton size="small" color="light">
                  <IonIcon icon={createOutline} />
                </IonButton>
              </NavLink>
              <IonButton
                size="small"
                color="danger"
                onClick={() => setShowAlert(true)}
              >
                <IonIcon icon={trashOutline} />
              </IonButton>
            </>
          )}
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header={'Удаление новости'}
            message={'Вы уверены, что хотите удалить новость?'}
            buttons={[
              {
                text: 'Отмена',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                  setShowAlert(false);
                },
              },
              {
                text: 'Да',
                handler: () => {
                  onDelete(id);
                },
              },
            ]}
          />
        </div>
      </div>

      <p>{children}</p>
      <IonItemDivider />
    </>
  );
};

export default NewsItem;
