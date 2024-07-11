"use client"
import React from 'react'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'
function MapView({latitude, longitude}) {
  const mapOptions = {
    zoomControl: false,
    mapTypeControl: false, // Disables map type control
    streetViewControl: false, // Disables street view control
    fullscreenControl: false,// Disables fullscreen control
    styles: [
      { elementType: 'geometry', stylers: [{ color: '#1b1b1b' }] }, // Dark gray for general geometry
      { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#8f8f8f' }] }, // Light gray for text
      { elementType: 'labels.text.stroke', stylers: [{ color: '#1b1b1b' }] }, // Dark gray for text stroke
      { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#5c5c5c' }] }, // Medium gray for administrative boundaries
      { featureType: 'administrative.country', elementType: 'labels.text.fill', stylers: [{ color: '#a1a1a1' }] }, // Light gray for country labels
      { featureType: 'administrative.land_parcel', stylers: [{ visibility: 'off' }] },
      { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#a8a8a8' }] }, // Light gray for locality labels
      { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#8f8f8f' }] }, // Light gray for points of interest labels
      { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#375F5B' }] }, // Dark green for parks
      { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#6f9d5b' }] }, // Light green for park labels
      { featureType: 'poi.park', elementType: 'labels.text.stroke', stylers: [{ color: '#1b1b1b' }] }, // Dark gray for park label strokes
      { featureType: 'road', elementType: 'geometry.fill', stylers: [{ color: '#2a2a2a' }] }, // Dark gray for roads
      { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#375F5B' }] }, // Light gray for road labels
      { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#333333' }] }, // Medium-dark gray for arterial roads
      { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#4a4a4a' }] }, // Darker gray for highways
      { featureType: 'road.highway.controlled_access', elementType: 'geometry', stylers: [{ color: '#5a5a5a' }] }, // Dark gray for controlled access highways
      { featureType: 'road.local', elementType: 'labels.text.fill', stylers: [{ color: '#8f8f8f' }] }, // Light gray for local road labels
      { featureType: 'transit', elementType: 'labels.text.fill', stylers: [{ color: '#8f8f8f' }] }, // Light gray for transit labels
      { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#1e3a56' }] }, // Blue-gray for water
      { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#6f9d5b' }] } // Light green for water labels
    ]
    
  };
  return (
    latitude && longitude &&
    <div className='map'>
      <APIProvider apiKey="AIzaSyBhZDlwF2kS94gabvenhlRTolWeEFK7W2I">
        <Map
          options={mapOptions} // Pass the options here
          className='map'
          defaultCenter={{ lat: latitude, lng: longitude }}
          defaultZoom={18}
        >
          <Marker
    position={{ lat: latitude, lng: longitude }}
    label={{ text: "Turner Tennis Club", color: "white" }}
    // icon={{
    //   path: CircleF,
    //   scale: 10,
    //   fillColor: 'white',
    //   fillOpacity: 1,
    //   strokeWeight: 0,
    // }}
          />
        </Map>
      </APIProvider>
    </div>

  )
}

export default MapView