import React, { useEffect } from 'react';
import {
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonSpinner,
} from '@ionic/react';
import { connect } from 'react-redux';

import NewsItem from './NewsItem';
import { fetchNews } from '../../actions';

const News = ({ news, isLoading, error, fetchNews }: any) => {
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol sizeMd="8" offsetMd="2" sizeLg="6" offsetLg="3">
              {isLoading ? (
                <IonSpinner />
              ) : (
                news.map(({ id, title, text }: any) => {
                  return (
                    <NewsItem key={id} title={title}>
                      {text}
                    </NewsItem>
                  );
                })
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: any) => {
  return {
    news: state.news,
    isLoading: state.isLoading,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchNews: () => dispatch(fetchNews()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
