import React, { useState, useCallback, FormEvent } from 'react';
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
  IonText
} from '@ionic/react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { createPost } from '../../actions/createPost';
import validate from '../../helpers/validateForm';
import { getAuthStatus } from '../../selectors/authSelectors';
import { getFeedError } from '../../selectors/feedSelectors';
import { Post } from '../../types';

const CreatePost: React.FC = () => {
  const [heading, setHeading] = useState<string>('');
  const [postContent, setPostContent] = useState<string>('');
  const [errors, setErrors] = useState<{
    heading: string;
    postContent: string;
  }>({ heading: '', postContent: '' });
  const history = useHistory();
  const isLoggedIn = useSelector(getAuthStatus);
  const error = useSelector(getFeedError);
  const dispatch = useDispatch();

  const onCreatePost = (post: Pick<Post, 'title' | 'content'>) =>
    dispatch(createPost(post));

  const handleChangeHeading = useCallback((e: any) => {
    setHeading(e.target.value);
  }, []);

  const handleChangePostContent = useCallback((e: any) => {
    setPostContent(e.target.value);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const localErrors = validate({ heading, postContent });
    setErrors(localErrors);

    if (Object.keys(localErrors).length === 0) {
      onCreatePost({
        title: heading,
        content: postContent
      });

      setHeading('');
      setPostContent('');

      history.push('/news');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="ion-text-center">
        <h2>You need to be logged in</h2>
        <Link to="/">Go home</Link>
      </div>
    );
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
                <h1>New post</h1>
                {error && <p>{error?.message}</p>}
              </div>
              <IonCard>
                <div className="ion-padding">
                  <form onSubmit={handleSubmit} className="ion-padding-bottom">
                    <div className="ion-padding-bottom">
                      <IonItem>
                        <IonLabel position="stacked">Heading</IonLabel>

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
                        <IonLabel position="stacked">Content</IonLabel>
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
                        <IonButton type="submit">Send</IonButton>
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

export default CreatePost;
