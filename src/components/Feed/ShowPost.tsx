import React, { useState, useCallback } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
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
import { useSelector, useDispatch } from 'react-redux';

import { deletePost } from '../../actions/deletePost';
import { getAuthStatus } from '../../selectors/authSelectors';
import { getFeedPosts, getFeedError } from '../../selectors/feedSelectors';
import displayDateTime from '../../helpers/displayDateTime';
import dictionary from '../../dictionary';

type Params = {
  id: string,
};

const ShowPost = () => {
  const params = useParams<Params>();
  const posts = useSelector(getFeedPosts);
  const isLoggedIn = useSelector(getAuthStatus);
  const error = useSelector(getFeedError);
  const post = posts.find((post: any) => post._id === params.id);
  const dispatch = useDispatch();

  const [showAlert, setShowAlert] = useState(false);
  const history = useHistory();

  const onDelete = useCallback(
    (id: any) => {
      dispatch(deletePost(id));

      history.push('/');
    },
    [dispatch, history]
  );

  if (!post) {
    return (
      <div className="ion-text-center">
        {error ? (
          <h2>{dictionary[error.message]}</h2>
        ) : (
          <>
            <h2>Пост не найден</h2>
            <NavLink to="/">Вернуться на главную</NavLink>
          </>
        )}
      </div>
    );
  }

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
            <h1>{post.title}</h1>
            <div className="post-description">
              <div>
                <span className="creator">{post.creator.displayName}</span> ·{' '}
                <span className="created-at">
                  {displayDateTime(post.createDate)}
                </span>
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
                        onDelete(post._id);
                      },
                    },
                  ]}
                />
              </div>
            </div>
            <p>{post.content}</p>
            <IonItemDivider />
            <div className="ion-padding-top ion-float-right">
              {isLoggedIn && (
                <>
                  <NavLink to={`/news/edit/${post._id}`}>
                    <IonButton
                      color="light"
                      size="small"
                      style={{ marginRight: 10 }}
                    >
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

export default ShowPost;
