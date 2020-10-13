import React, { useState, useCallback } from 'react';
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
  IonText,
} from '@ionic/react';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router';

import { createPost } from '../../actions/createPost';
import validate from '../../helpers/validateForm';

const CreatePost = ({ createPost, isLoggedIn, error }: any) => {
  const [heading, setHeading] = useState('');
  const [postContent, setPostContent] = useState('');
  const [errors, setErrors] = useState({ heading: '', postContent: '' });
  const history = useHistory();

  const handleChangeHeading = useCallback((e: any) => {
    setHeading(e.target.value);
  }, []);

  const handleChangePostContent = useCallback((e: any) => {
    setPostContent(e.target.value);
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const localErrors = validate({ heading, postContent });
    setErrors(localErrors);

    if (Object.keys(localErrors).length === 0) {
      createPost({
        title: heading,
        content: postContent,
      });

      setHeading('');
      setPostContent('');

      history.push('/news');
    }
  };

  if (!isLoggedIn) {
    return <Redirect to="/news" />;
  }

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
                  <form onSubmit={handleSubmit} className="ion-padding-bottom">
                    <div className="ion-padding-bottom">
                      <IonItem>
                        <IonLabel position="stacked">
                          Заголовок новости
                        </IonLabel>

                        <IonInput
                          type="text"
                          value={heading}
                          onIonChange={handleChangeHeading}
                          required
                        />
                      </IonItem>
                      {errors.heading && (
                        <div className="ion-padding-top">
                          <IonText color="danger">{errors.heading}</IonText>
                        </div>
                      )}
                    </div>
                    <div className="ion-padding-bottom">
                      <IonItem>
                        <IonLabel position="stacked">Текст</IonLabel>
                        <IonTextarea
                          onIonChange={handleChangePostContent}
                          rows={6}
                          value={postContent}
                        />
                      </IonItem>
                      {errors.postContent && (
                        <div className="ion-padding-top">
                          <IonText color="danger">{errors.postContent}</IonText>
                        </div>
                      )}
                    </div>

                    <div className="ion-padding-bottom">
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
    news: state.feed.posts,
    isLoggedIn: state.auth.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createPost: (post: any) => dispatch(createPost(post)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
