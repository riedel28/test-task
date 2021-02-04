import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { IonButton, IonIcon, IonAlert, IonItemDivider } from '@ionic/react';
import { createOutline, trashOutline } from 'ionicons/icons';

import { deletePost } from '../../actions/deletePost';
import { getAuthStatus } from '../../selectors/authSelectors';
import { getFeedPosts } from '../../selectors/feedSelectors';
import displayDateTime from '../../helpers/displayDateTime';
import shortenText from '../../helpers/shortenText';
import { Post as PostType } from '../../types';

const NewsItem = ({ id }: { id: string }) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const dispatch = useDispatch();
  const posts = useSelector(getFeedPosts);
  const isLoggedIn = useSelector(getAuthStatus);

  const { title, content, creator, createDate } = posts.find(
    (post: PostType) => post._id === id
  ) as PostType;
  const onDelete = (id: string) => dispatch(deletePost(id));

  return (
    <>
      <NavLink to={`/news/${id}`}>
        <h2>{title}</h2>
      </NavLink>

      <div className="post-description">
        <div>
          <span className="creator">{creator.displayName}</span> ·{' '}
          <span className="created-at">{displayDateTime(createDate)}</span>
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
            header={'Delete post'}
            message={'Are you sure you want to delete this post?'}
            buttons={[
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                  setShowAlert(false);
                },
              },
              {
                text: 'Yes',
                handler: () => {
                  onDelete(id);
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

export default NewsItem;
