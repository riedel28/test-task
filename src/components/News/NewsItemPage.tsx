import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonAlert,
  IonItemDivider,
} from '@ionic/react';
import { createOutline, trashOutline } from 'ionicons/icons';
import { connect } from 'react-redux';

import displayDateTime from './../../helpers/displayDateTime';

const NewsItem = ({
  title,
  content,
  creator,
  createdAt,
  id,
  // onDelete,
  isLoggedIn,
}: any) => {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <>
      <IonGrid>
        <IonRow>
          <IonCol
            sizeSm="8"
            offsetSm="2"
            sizeMd="6"
            offsetMd="3"
            sizeLg="6"
            offsetLg="3"
          >
            <h2>{title}</h2>

            <div className="post-description">
              <div>
                <span className="creator">{creator}</span> ·{' '}
                <span className="created-at">{displayDateTime(createdAt)}</span>
              </div>

              <div>
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
                        // onDelete(id);
                      },
                    },
                  ]}
                />
              </div>
            </div>

            <p>{content}</p>
            {isLoggedIn && (
              <>
                <NavLink to={`/news/edit/${id}`}>
                  <IonButton color="light">
                    <IonIcon icon={createOutline} slot="start" /> Edit
                  </IonButton>
                </NavLink>
                <IonButton color="danger" onClick={() => setShowAlert(true)}>
                  <IonIcon icon={trashOutline} slot="start" />
                  Delete
                </IonButton>
              </>
            )}
            <IonItemDivider />
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const postId = ownProps.match.params.id;

  const post = state.news.news.find((post: any) => post._id === postId);

  return {
    id: postId,
    title: post.title,
    content: post.content,
    creator: post.creator.displayName,
    createdAt: post.createDate,
    isLoggedIn: state.auth.isLoggedIn,
  };
};

export default connect(mapStateToProps, null)(NewsItem);
