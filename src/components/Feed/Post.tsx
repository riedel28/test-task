import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { IonButton, IonIcon, IonAlert, IonItemDivider } from '@ionic/react';
import { createOutline, trashOutline } from 'ionicons/icons';

import { deletePost } from '../../actions/deletePost';
import { getAuthStatus } from '../../selectors/authSelectors';
import { getFeedPosts } from '../../selectors/feedSelectors';
import displayDateTime from '../../helpers/displayDateTime';
import shortenText from '../../helpers/shortenText';

const NewsItem = ({
  id,
  title,
  content,
  creator,
  createdAt,
  isLoggedIn,
  deletePost,
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
                  deletePost(id);
                },
              },
            ]}
          />
        </div>
      </div>

      <p>{shortenText(content)}</p>
      <IonItemDivider />
    </>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const post = getFeedPosts(state).find(
    (post: any) => post._id === ownProps.id
  );

  return {
    title: post.title,
    content: post.content,
    creator: post.creator,
    createdAt: post.createDate,
    isLoggedIn: getAuthStatus(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    deletePost: (id: any) => dispatch(deletePost(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsItem);
