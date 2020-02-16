import React, { useEffect } from 'react';
import {
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonSpinner,
  IonLabel,
} from '@ionic/react';
import { connect } from 'react-redux';

import NewsItem from './NewsItem';
import { fetchNews } from '../../actions/fetchNews';

const News = ({ news, isLoading, error, fetchNews }: any) => {
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  if (error) {
    return <IonLabel color="danger">{error}</IonLabel>;
  }

  if (news.length < 1) {
    return <div>Новостей пока нет</div>;
  }

  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          {isLoading ? (
            <IonRow className="ion-justify-content-center ion-align-items-center ion-padding">
              <IonSpinner />
            </IonRow>
          ) : (
            <IonRow>
              <IonCol sizeMd="8" offsetMd="2" sizeLg="6" offsetLg="3">
                <div className="ion-padding-bottom">
                  <h1>Новости</h1>
                </div>
                {isLoading ? (
                  <div className="ion-justify-content-center ion-align-items-center">
                    <IonSpinner />
                  </div>
                ) : (
                  news.map(
                    ({ _id, title, content, creator, createDate }: any) => {
                      return (
                        <NewsItem
                          key={_id}
                          title={title}
                          creator={creator}
                          createdAt={createDate}
                        >
                          {content}
                        </NewsItem>
                      );
                    }
                  )
                )}
                <div className="ion-text-end">
                  <em>Всего новостей: </em> {news.length}
                </div>
              </IonCol>
            </IonRow>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: any) => {
  return {
    news: state.news.news,
    isLoading: state.news.isLoading,
    error: state.news.error,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchNews: () => dispatch(fetchNews()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
