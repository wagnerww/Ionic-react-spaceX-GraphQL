import React, { useState, useCallback, useEffect } from 'react'
import { useLaunchesPastQuery, Launch } from '../generated/graphql';
import LaunchesItem from './LaunchesItem';
import { IonButton } from '@ionic/react';

const Launches: React.FC = () => {
  //const { data, loading } = useQuery<LaunchesPastQuery>(LAUNCHES_PAST_QUERY)
  const { data, loading, fetchMore } = useLaunchesPastQuery({
    variables: { limit: 12, offset: 0 }
  })
  const [offset, setOffset] = useState<number>(0)
  const [limit] = useState<number>(12)
  const [finish, setFinish] = useState(false)

  const handleLoadMore = useCallback(() => setOffset(limit + offset), [limit, offset])

  useEffect(() => {  
    if (offset > 0){
      fetchMore({
        variables: {
          offset
        },
        //Reescreve a query
        updateQuery(previous, { fetchMoreResult }){
          // console.log('prev', previous)
          // console.log('more', fetchMoreResult)
          if (!fetchMoreResult) {
            return previous
          }

          if(fetchMoreResult.launchesPast.length < limit){
            setFinish(true)
          }
  
          return {
            ...previous, launchesPast: [
              ...previous.launchesPast, 
              ...fetchMoreResult.launchesPast
            ],
          }
        }
      })
    }
  }, [fetchMore, offset, limit])

  return (
    <>
     { loading ? <p>Loading...</p> : data && data.launchesPast.map(launch => 
         <LaunchesItem key={launch.id} launch={launch as Launch} />
        )}
        {!loading && !finish ? (
          <IonButton expand="block" onClick={handleLoadMore}>
            Load more ...
          </IonButton>) : null}
    </>
  )
}

export default Launches
