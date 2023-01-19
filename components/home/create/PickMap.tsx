import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

type MarkerType = {
  lat: number | null
  lng: number | null
}
interface MapProps {
  setPoint: Dispatch<SetStateAction<{ lat: number; lng: number } | undefined>>
}
const PickMap: FC<MapProps> = ({ setPoint }) => {
  const [reloadMarkers, setReloadMarkers] = useState(false)

  const [marker, setMarker] = useState<MarkerType>()

  useEffect(() => {
    setTimeout(() => {
      setReloadMarkers(true)
    }, 1000)
  }, [])

  const handleOnLoad = (map: google.maps.Map) => {
    const bounds = new google.maps.LatLngBounds()
    bounds.extend({ lat: 53, lng: 19 })
    bounds.extend({ lat: 54, lng: 18 })
    map.fitBounds(bounds)
  }

  const handleMapClick = (lat: MarkerType['lat'], lng: MarkerType['lng']) => {
    if (!lat || !lng) return

    setMarker({ lat, lng })
    setPoint({ lat, lng })
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
      onClick={({ latLng }) => handleMapClick(latLng?.lat()!, latLng?.lng()!)}
      mapContainerStyle={{ width: '100%', height: '100%' }}
    >
      {reloadMarkers && marker && (
        <Marker position={{ lat: marker.lat!, lng: marker.lng! }} />
      )}
    </GoogleMap>
  )
}

export default PickMap
