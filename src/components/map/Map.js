
import React, {useState, useEffect} from 'react';
import {CameraAlt, Place} from "@material-ui/icons";
import ReactMapGL, {
    GeolocateControl,
    Marker,
    Popup,
    NavigationControl
} from "react-map-gl";
 import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'



//geolocation button position
const geolocateStyle ={
    float: 'left',
    margin: '50px',
    padding: '10px'
};
//navigation buttons position
const navistyle ={
    float: 'right',
    margin: '50px',
    padding: '10px'
};


export default function Map(props){
    const [marker, setMarker] = useState({ longitude: 24.94, latitude: 60.16})
    const [events, setEvents] = useState({})
    //Shows coordinates for start position
    const [viewport, setViewport] = useState({
        latitude: 60.16741,
        longitude: 24.942577,
        height: props.height ? props.height : '100vh',
        width: props.width ? props.width : '100vw',
        zoom: 10,
    });

    

    const logDragEvent = (name, e) => {
        setEvents({...events, [name]: e.lngLat})
    }

    const onMarkerDragStart = e => {
        logDragEvent('onDragStart', e)
    }
    const onMarkerDrag = e => {
        logDragEvent('onDrag', e)
    }
    const onMarkerDragEnd = event => {
        logDragEvent('onDragEnd', event);
        setMarker({    
                longitude: event.lngLat[0],
                latitude: event.lngLat[1]
             });
        props.handleCoordinates({target: {longitude: event.lngLat[0], latitude: event.lngLat[1]}});

    };

    //Escape shuts down popup
    const [selectedPark, setSelectedPark] = useState(null);
    useEffect(()=> {
        setMarker(marker)
        const listener = e => {
            if (e.key === "Escape"){
                setSelectedPark(null);
            }
        };
        window.addEventListener("keydown", listener);
    }, []);

        return(
            <div>
                <ReactMapGL
                    {...viewport}
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    onViewportChange={(viewport)=>{
                        setViewport(viewport);
                    }}
                >

                    {selectedPark ?(
                        <Popup
                            latitude={selectedPark.geometry.coordinates[1]}
                            longitude={selectedPark.geometry.coordinates[0]}
                            onClose={()=>{
                                setSelectedPark(null);
                        }}
                            >
                            <div>
                                <h2>{selectedPark.properties.NAME}</h2>
                                <p>{selectedPark.properties.DESCRIPTIO}</p>
                            </div>
                        </Popup>

                    ): null}
                    {/* /!* This Marker crashes when let go  *!/*/}
                    
                      <Marker
                        latitude={marker.latitude}
                        longitude={marker.longitude}
                        draggable
                        onDragEnd={onMarkerDragEnd}
                        onDragStart={onMarkerDragStart}
                        onDrag={onMarkerDrag}
                        >
                        <Place/>
                    </Marker>
                    {/* Geocoder  */}

                    
                   
                    
                    <div className="nav" style={navistyle}>
                    <NavigationControl/>
                    <GeolocateControl
/*
                        style={geolocateStyle}
*/
                        positionOptions={{enableHighAccuracy: true}}
                        trackUserLocation={true}
                    />
                    </div>
                </ReactMapGL>
            </div>
        );
    }


