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
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';

import { editPost } from '../../actions/editPost';
import { getFeedPosts } from '../../selectors/feedSelectors';
import validate from '../../helpers/validateForm';

type Params = {
  id: string,
};

const EditPost = ({ error }: any) => {
  const params = useParams<Params>();
  const posts = useSelector(getFeedPosts);
  const post = posts.find((post: any) => post._id === params.id);

  const [heading, setHeading] = useState(post.title);
  const [postContent, setPostContent] = useState(post.content);

  const [errors, setErrors] = useState({ heading: '', postContent: '' });
  const history = useHistory();

  const dispatch = useDispatch();

  const onEditPost = useCallback(
    (id: any, post: any) => dispatch(editPost(id, post)),
    [dispatch]
  );

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
      onEditPost(post._id, {
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
                <h1>Редактировать пост</h1>
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

                    <div className="ion-float-right">
                      <IonButton
                        onClick={handleSubmit}
                        style={{ marginBottom: 20 }}
                      >
                        Отправить
                      </IonButton>
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
