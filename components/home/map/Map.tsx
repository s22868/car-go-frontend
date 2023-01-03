import React, { FC, useEffect, useState } from 'react'
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from '@react-google-maps/api'

type MarkerType = {
  id: string
  name: string
  position: {
    lat: number
    lng: number
  }
}
interface MapProps {
  markers: MarkerType[]
}
const Map: FC<MapProps> = ({ markers }) => {
  const [activeMarker, setActiveMarker] = useState(null)
  const [reloadMarkers, setReloadMarkers] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setReloadMarkers(true)
    }, 1000)
  }, [])

  const handleActiveMarker = (marker: any) => {
    if (marker === activeMarker) {
      return
    }
    setActiveMarker(marker)
  }

  const handleOnLoad = (map: google.maps.Map) => {
    const bounds = new google.maps.LatLngBounds()
    markers.forEach(({ position }) => bounds.extend(position))
    map.fitBounds(bounds)
  }
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: '',
  })

  if (!isLoaded) {
    return null
  }
  return (
    <GoogleMap
      onLoad={handleOnLoad}
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={{ width: '100%', height: '100%' }}
    >
      {reloadMarkers &&
        markers.map(({ id, name, position }) => (
          <Marker
            key={id}
            position={position}
            onClick={() => handleActiveMarker(id)}
          >
            {activeMarker && activeMarker === id ? (
              <InfoWindow
                onUnmount={() => setActiveMarker(null)}
                onCloseClick={() => setActiveMarker(null)}
              >
                <>
                  <div>{name}</div>
                </>
              </InfoWindow>
            ) : null}
          </Marker>
        ))}
    </GoogleMap>
  )
}

export default Map
