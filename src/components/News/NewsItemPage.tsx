import React, { useState } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
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

import { fetchNewsItem } from './../../actions/fetchNewsItem';
import { deletePost } from './../../actions/deletePost';
import displayDateTime from './../../helpers/displayDateTime';

const NewsItem = ({
  title,
  content,
  creator,
  createdAt,
  isLoggedIn,
  deletePost,
}: any) => {
  const [showAlert, setShowAlert] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  const onDelete = (id: any) => {
    deletePost(id);

    history.push('/');
  };

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
            <h1>{title}</h1>

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
                        onDelete(id);
                      },
                    },
                  ]}
                />
              </div>
            </div>

            <p>{content}</p>
            <IonItemDivider />
            <div className="ion-padding-top">
              {isLoggedIn && (
                <>
                  <NavLink to={`/news/edit/${id}`}>
                    <IonButton color="light" size="small">
                      <IonIcon icon={createOutline} slot="start" /> Edit
                    </IonButton>
                  </NavLink>
                  <IonButton
                    color="danger"
                    onClick={() => setShowAlert(true)}
                    size="small"
                  >
                    <IonIcon icon={trashOutline} slot="start" />
                    Delete
                  </IonButton>
                </>
              )}
            </div>
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
    id: post._id,
    title: post.title,
    content: post.content,
    creator: post.creator.displayName,
    createdAt: post.createDate,
    isLoggedIn: state.auth.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchNewsItem: (id: any) => dispatch(fetchNewsItem(id)),
    deletePost: (id: any) => dispatch(deletePost(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsItem);