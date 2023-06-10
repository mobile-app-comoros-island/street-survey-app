import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import SurveyForm from './SurveyForm';
//fix leaflet-icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';


function MapContainer({ lat, lon }) {
  
  const mapRef = useRef(null);
  const [showForm, setShowForm] = useState(false);

  //fix leaflet-icon issue
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  useEffect(() => {
    mapRef.current = L.map('map', {
      center: [lat, lon],
      zoom: 13,
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data © OpenStreetMap contributors',
        }),
      ],
    });

    //set default marker
    const marker = L.marker([lat, lon]).addTo(mapRef.current);


    marker.on('click', () => {
      setShowForm(true);
    });

    return () => {
      mapRef.current.remove();
    };
  }, [lat, lon]);

  return (
    <div className="map-container">
      <div id="map" className="map" style={{ height: '400px' }} />
      {showForm && <SurveyForm />}
    </div>
  );
}

export default MapContainer;
