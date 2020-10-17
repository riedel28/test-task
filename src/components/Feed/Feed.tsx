import React, { useEffect } from 'react';
import { IonPage, IonGrid, IonRow, IonCol, IonContent } from '@ionic/react';
import { connect } from 'react-redux';

import Post from './Post';
import { fetchFeed } from '../../actions/fetchFeed';
import dictionary from '../../dictionary';

const Feed = ({ news, isLoading, error, fetchNews }: any) => {
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

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
                news.map((id: any) => {
                  return <Post key={id} id={id} />;
                })
              )}

              <div className="ion-text-end ion-padding-top">
                <em>Всего новостей: </em> {news.length}
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    news: state.feed.posts.map((post: any) => post._id),
    isLoading: state.feed.isLoading,
    error: state.feed.error,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchNews: () => dispatch(fetchFeed()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
