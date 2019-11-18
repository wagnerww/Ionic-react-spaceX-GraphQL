import React from 'react'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import Launches from '../components/Launches';

const Missions: React.FC = () => {

  return (
    <IonPage>
      <IonHeader color="primary">
        <IonToolbar>
          <IonTitle>Ionic Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
       <Launches />
      </IonContent>
    </IonPage>
  )
}

export default Missions
