import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import 'aos'

import './MapSection.Styles.scss'

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [20, 32],
    iconAnchor: [10, 32]
});

L.Marker.prototype.options.icon = DefaultIcon;

class MapSection extends React.Component {
    render(){
        return (
            <div className='map-section'>
                <div className='map-container' id='mapid' data-aos="fade-up" data-aos-duration="1000">	
                    <MapContainer center={[12.935734, 77.525311]} zoom={14} scrollWheelZoom={false} touchZoom={false} dragging={false}>
                        <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                            <Marker position={[12.923829, 77.530293]}>
                                <Popup>
                                    Open in <a href='https://maps.app.goo.gl/eMs7RdpJ9uPxbw3CA' target='_blanck'>Google Maps</a>
                                </Popup>
                            </Marker>
                            <Marker position={[12.947639, 77.520330]}>
                                <Popup>
                                    Open in <a href='https://maps.app.goo.gl/am1prqMjPrST6z4y9' target='_blanck'>Google Maps</a>
                                </Popup>
                            </Marker>
                    </MapContainer>
                </div>
                <div className='background'></div>
            </div>
        )
    }
}

export default MapSection