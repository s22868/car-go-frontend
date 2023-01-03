import React, { useEffect, useState } from 'react'
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from '@react-google-maps/api'

const markers = [
  {
    id: 3333,
    name: 'Fura1, test',
    position: { lat: 53, lng: 19 },
  },
  {
    id: 4444,
    name: 'Fura2, test2',
    position: { lat: 52, lng: 20 },
  },
  {
    id: 5555,
    name: 'Fura3, test5',
    position: { lat: 52, lng: 23 },
  },
  {
    id: 6666,
    name: 'Fura4, test6',
    position: { lat: 50, lng: 20 },
  },
]

function Map() {
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
