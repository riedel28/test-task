import React, { useEffect, useCallback } from 'react';
import { IonPage, IonGrid, IonRow, IonCol, IonContent } from '@ionic/react';
import { useSelector, useDispatch } from 'react-redux';

import Post from './Post';
import { fetchFeed } from '../../actions/fetchFeed';
import { getFeedPosts, getFeedError } from '../../selectors/feedSelectors';
import dictionary from '../../dictionary';
import { Post as PostType } from '../../types';

const Feed = () => {
  const news = useSelector(getFeedPosts);
  const newsIds = news.map((post: PostType) => post._id);
  const error = useSelector(getFeedError);
  const dispatch = useDispatch();

  const fetchPosts = useCallback(() => dispatch(fetchFeed()), [dispatch]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (error) {
    return (
      <div className="ion-text-center">
        <h2>{dictionary[error.message]}</h2>
      </div>
    );
  }

  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol sizeMd="8" offsetMd="2" sizeLg="6" offsetLg="3">
              <div className="ion-padding-bottom">
                <h1>Новости</h1>
              </div>
              {news.length < 1 ? (
                <div className="ion-text-center">
                  <h2>Новостей пока нет</h2>
                </div>
              ) : (
                newsIds.map((id: string) => {
                  return <Post key={id} id={id} />;
                })
              )}

              {news.length > 0 && (
                <div className="ion-text-end ion-padding-top">
                  <em>Всего новостей: </em> {news.length}
                </div>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Feed;
