import React from 'react'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from '@ionic/react';
import { useParams } from 'react-router';
import { useLaunchQuery, Launch } from '../generated/graphql';
import LaunchDetail from '../components/LaunchDetail';

const Mission: React.FC = () => {
  const { id } = useParams<{id: string}>()
  const { data, loading } = useLaunchQuery({
    variables: { id }
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/missions" />
          </IonButtons>
          <IonTitle>
            Mission Details
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
          {loading ? <p>Loading...</p> : <LaunchDetail launch={data!.launch as Launch} /> }
      </IonContent>
    </IonPage>
  )
}

export default Mission
