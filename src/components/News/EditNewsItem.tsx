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
import { useHistory } from 'react-router';

import { editPost } from '../../actions/editPost';

const EditNewsItem = ({ news, isLoading, error, post, editPost }: any) => {
  const [heading, setHeading] = useState(post.title);
  const [postContent, setPostContent] = useState(post.content);
  const history = useHistory();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    editPost(post._id, {
      title: heading,
      content: postContent,
    });

    setHeading('');
    setPostContent('');

    history.push('/news');
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

const mapStateToProps = (state: any, ownProps: any) => {
  const postId = ownProps.match.params.id;

  return {
    post: state.news.news.find((post: any) => post._id === postId),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    editPost: (id: any, post: any) => dispatch(editPost(id, post)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditNewsItem);
