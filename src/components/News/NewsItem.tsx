import React from 'react';
import { NavLink } from 'react-router-dom';
import { IonButton, IonIcon } from '@ionic/react';
import { createOutline, trashOutline } from 'ionicons/icons';

import displayDateTime from './../../helpers/displayDateTime';

const NewsItem = ({
  title,
  children,
  creator,
  createdAt,
}: {
  title: any,
  children: any,
  creator: any,
  createdAt: any,
}) => {
  return (
    <>
      <h2>{title}</h2>

      <div className="post-description">
        <div>
          <span className="creator">{creator.displayName}</span> ·{' '}
          <span className="created-at">{displayDateTime(createdAt)}</span>
        </div>

        <div>
          <NavLink to="/">
            <IonButton size="small" color="light">
              <IonIcon icon={createOutline} />
            </IonButton>
          </NavLink>

          {/* <NavLink to="/"> */}
          <IonButton size="small" color="danger">
            <IonIcon icon={trashOutline} />
          </IonButton>
          {/* </NavLink> */}
        </div>
      </div>

      <p>{children}</p>
    </>
  );
};

export default NewsItem;
