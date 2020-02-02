import React from 'react';
import { IonPage, IonGrid, IonRow, IonCol, IonContent } from '@ionic/react';

const News = () => (
  <IonPage>
    <IonContent>
      <IonGrid>
        <IonRow>
          <IonCol sizeMd="8" offsetMd="2" sizeLg="6" offsetLg="3">
            <h1>News</h1>
            <div>
              <h3>Heading #1</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
                excepturi error, reiciendis placeat tenetur ratione velit, optio
                fugit assumenda sit laboriosam repellendus quod. Illo impedit
                officia incidunt deleniti delectus minus qui est provident odit,
                magnam ducimus distinctio quis, fugit hic nobis ipsum enim fuga
                aperiam commodi amet laborum. In dolores rerum odit unde, cumque
                obcaecati aliquid nihil tenetur natus dolor quo nemo. Atque vel
                in laudantium, repudiandae magnam illum quibusdam omnis debitis
                commodi nemo, fugit odio accusamus vero facilis cumque
                voluptatum consequatur doloribus incidunt nostrum mollitia ipsam
                maiores corporis. Nisi placeat libero amet accusamus, quae saepe
                natus dignissimos quisquam dolorem?
              </p>
            </div>
            <div>
              <h3>Heading #2</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
                excepturi error, reiciendis placeat tenetur ratione velit, optio
                fugit assumenda sit laboriosam repellendus quod. Illo impedit
                officia incidunt deleniti delectus minus qui est provident odit,
                magnam ducimus distinctio quis, fugit hic nobis ipsum enim fuga
                aperiam commodi amet laborum. In dolores rerum odit unde, cumque
                obcaecati aliquid nihil tenetur natus dolor quo nemo. Atque vel
                in laudantium, repudiandae magnam illum quibusdam omnis debitis
                commodi nemo, fugit odio accusamus vero facilis cumque
                voluptatum consequatur doloribus incidunt nostrum mollitia ipsam
                maiores corporis. Nisi placeat libero amet accusamus, quae saepe
                natus dignissimos quisquam dolorem?
              </p>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  </IonPage>
);

export default News;
