import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonItem,
  IonInput,
  IonTextarea,
  IonCard,
  IonButton,
} from '@ionic/react';
import { connect } from 'react-redux';

import { createPost } from './../../actions/createPost';

const CreateNews = ({ createPost, news, isLoading, error }: any) => {
  const [heading, setHeading] = useState('');
  const [postContent, setPostContent] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();

    createPost({
      title: heading,
      content: postContent,
    });

    setHeading('');
    setPostContent('');
  };

  return (
    <IonPage>
      <IonContent>
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
              <div className="ion-padding-horizontal ion-padding-bottom">
                <h1>Новый пост</h1>
                {error && <p>{error.error}</p>}
              </div>
              <IonCard>
                <div className="ion-padding">
                  <form onSubmit={handleSubmit}>
                    <div className="ion-padding-bottom">
                      <IonItem>
                        <IonLabel position="stacked">
                          Заголовок новости
                        </IonLabel>
                        <IonInput
                          type="email"
                          value={heading}
                          onIonChange={(e: any) => setHeading(e.target.value)}
                          required
                        />
                      </IonItem>
                    </div>
                    <div className="ion-padding-bottom">
                      <IonItem>
                        <IonLabel position="stacked">Текст</IonLabel>
                        <IonTextarea
                          onIonChange={(e: any) =>
                            setPostContent(e.target.value)
                          }
                          rows={6}
                          value={postContent}
                        ></IonTextarea>
                      </IonItem>
                    </div>

                    <div className="ion-padding-top">
                      <div className="ion-float-right">
                        <IonButton onClick={handleSubmit}>Отправить</IonButton>
                      </div>
                    </div>
                  </form>
                </div>
              </IonCard>
            </IonCol>
          </IonRow>
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
    createPost: (post: any) => dispatch(createPost(post)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNews);
