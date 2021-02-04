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
  IonText,
} from '@ionic/react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';

import { editPost } from '../../actions/editPost';
import { getFeedError, getFeedPosts } from '../../selectors/feedSelectors';
import validate from '../../helpers/validateForm';
import { Post } from '../../types';

type Params = {
  id: string,
};

const EditPost = () => {
  const params = useParams<Params>();
  const posts = useSelector(getFeedPosts);
  const post = posts.find((post) => post._id === params.id);

  const [heading, setHeading] = useState<string>(post!.title);
  const [postContent, setPostContent] = useState<string>(post!.content);

  const [errors, setErrors] = useState<{heading: string, postContent: string}>({ heading: '', postContent: '' });
  const history = useHistory();
  const error = useSelector(getFeedError);

  const dispatch = useDispatch();

  const onEditPost = useCallback(
    (id: string, post: Pick<Post, 'title' | 'content'>) => dispatch(editPost(id, post)),
    [dispatch]
  );

  const handleChangeHeading = useCallback((e) => {
    setHeading(e.target.value);
  }, []);

  const handleChangePostContent = useCallback((e) => {
    setPostContent(e.target.value);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const localErrors = validate({ heading, postContent });
    setErrors(localErrors);

    if (Object.keys(localErrors).length === 0) {
      onEditPost(post!._id, {
        title: heading,
        content: postContent,
      });

      setHeading('');
      setPostContent('');

      history.push('/news');
    }
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
                <h1>Edit post</h1>
                {error && <p>{error!.message}</p>}
              </div>
              <IonCard>
                <div className="ion-padding">
                  <form onSubmit={handleSubmit} className="ion-padding-bottom">
                    <div className="ion-padding-bottom">
                      <IonItem>
                        <IonLabel position="stacked">
                          Post heading
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
                        <IonButton type="submit">Save</IonButton>
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

export default EditPost;
