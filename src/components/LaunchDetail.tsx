import React from 'react'
import { IonCard, IonItem, IonAvatar, IonText, IonImg, IonIcon, IonCardContent, IonCol, IonRow, IonThumbnail } from '@ionic/react'
import { checkmark, close } from 'ionicons/icons'
import { Launch } from '../generated/graphql';

import noPhoto from '../assets/images/no-photo.svg'
import styles from './LaunchDetail.module.scss';

interface Props {
  launch: Launch
}

const LaunchDetail: React.FC<Props> = ({ launch })  => {
  return (
    <IonCard>
      <IonItem lines="none">
        <IonAvatar slot="start">
          <IonImg src={launch.links.mission_patch_small} />
        </IonAvatar>
        <IonText color="dark">
          <h2 className="ion-no-margin">{launch.mission_name}</h2>
          <p className="ion-no-margin">{launch.rocket.rocket_name}</p>
        </IonText>
        <IonIcon
          slot="end" 
          color={launch.launch_success ? 'success' : 'danger'}
          icon={launch.launch_success ? checkmark : close}
        />
      </IonItem>

      <IonImg className={styles.img} src={launch.links.flickr_images[0] || noPhoto} />
      <IonCardContent>{launch.details}</IonCardContent>
      {launch.links.flickr_images.length ? <IonCardContent>
        <IonRow>
          {launch.links.flickr_images.map(image => (
            <IonCol key={image} size="3">
              <IonThumbnail className={styles.thumb}>
                <IonImg src={image}></IonImg>
              </IonThumbnail>
            </IonCol>
          ))}
        </IonRow>
        </IonCardContent> : 
        null
      }

    </IonCard>
  )
}

export default LaunchDetail
