
import React, { Component } from 'react';
import { CameraAlt, Place } from "@material-ui/icons";
import MapGL, {
    GeolocateControl,
    Marker,
    Popup,
    NavigationControl
} from "react-map-gl";
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import Geocoder from 'react-map-gl-geocoder' 
import 'mapbox-gl/dist/mapbox-gl.css'
import { AuthContext } from '../context/Authcontext'
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

export default class MapClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: 60.16741,
                longitude: 24.942577,
                height: props.height ? props.height : '100vh',
                width: props.width ? props.width : '100vw',
                zoom: 10,
            },
            marker: {
                longitude: 24.94, latitude: 60.16 
            },
            events: {},
            selectedPark: null,
            popupInfo: null,
            locations: [],
            selectedLocation: null
        }
    }
    mapRef = React.createRef()
    
    componentDidMount() {
        this.setState({ marker: this.state.marker })
        this.context.getData("plans").then(res => this.setState({ locations: res }))
        
        const listener = e => {
            if (e.key === "Escape") {
                this.setState({selectedLocation: null});
            }
        };
        window.addEventListener("keydown", listener);
    }
    
    componentDidUpdate() {
        

    }
    updateViewport = viewport => {
        this.setState({ viewport });
    };

    logDragEvent  (name, event)  {
        this.setState({
            events: {
                ...this.state.events,
                [name]: event.lngLat
            }
        });
    }

    onMarkerDragStart = event => {
        this.logDragEvent('onDragStart', event);
    };

    onMarkerDrag = event => {
        this.logDragEvent('onDrag', event);
    };

    onMarkerDragEnd = event => {
        this.logDragEvent('onDragEnd', event);
        console.log(event.lngLat[0])
        this.setState({
            marker: {
                longitude: event.lngLat[0],
                latitude: event.lngLat[1]
            }
        });
    };


    handleViewportChange = (viewport) => {
        this.setState({
            viewport: { ...this.state.viewport, ...viewport }
        })
    }

    handleGeocoderViewportChange = (viewport) => {
        const geocoderDefaultOverrides = { transitionDuration: 1000 }

        return this.handleViewportChange({
            ...viewport,
            ...geocoderDefaultOverrides
        })
    }

    render() {
        
        const { viewport } = this.state;
        
        return (
            <div>
                <MapGL
                ref={this.mapRef}
                    {...viewport}
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    onViewportChange={this.updateViewport}
                >
                    
                    {this.state.locations.length ? null : this.state.locations.map(loc => {
                        return <Marker key={loc.id}
                            mapRef={this.mapRef}
                            latitude={60}
                            longitude={25}>
                            <CameraAlt mapRef={this.mapRef} onClick={(e) => {
                                e.preventDefault();
                                this.setState({ selectedLocation: loc })
                            }} />

                        </Marker>
                    }) }

                    {/* Popup when clicked photoshoot-location */}
                    {this.state.selectedLocation ? (
                        <Popup
                            mapRef={this.mapRef}
                            tipSize={5}
                            anchor="top"
                            longitude={25 /* this.state.selectedLocation.location */}
                            latitude={60 /* this.state.selectedLocation.location */}
                            closeOnClick={false}
                            onClose={() => this.setState({ selectedLocation: null })}
                        >
                            <div>
                                <h2>{this.state.selectedLocation.description}</h2>
                                <p>{this.state.selectedLocation.date}</p>
                                <Nav.Link>
                                    <Link to={{ pathname: "/plans/" + this.state.selectedLocation.id, }}
                                    >Photoshoot
                                    </Link>
                                </Nav.Link>
                            </div>
                        </Popup>) : null}

                    {/*  Draggable marker  */}

                    <Marker
                        mapRef={this.mapRef}
                        latitude={this.state.marker.latitude}
                        longitude={this.state.marker.longitude}
                        offsetTop={-20}
                        offsetLeft={-10}
                        draggable
                        
                        onDragEnd={this.onMarkerDragEnd}
                        onDragStart={this.onMarkerDragStart}
                        onDrag={this.onMarkerDrag}
                    >
                        {this.state.popupInfo ? (
                            <Popup
                                mapRef={this.mapRef}
                                
                                tipSize={5}
                                anchor="top"
                                longitude={25 /* this.state.selectedLocation.location */}
                                latitude={60 /* this.state.selectedLocation.location */}
                                closeOnClick={false}
                                onClose={() => this.setState({ popupInfo: null })}
                            >
                                <div>
                                    <h2>{this.state.selectedLocation.description}</h2>
                                    <p>{this.state.selectedLocation.date}</p>
                                    <Nav.Link>
                                        <Link to={{ pathname: "/plan/" + this.state.selectedLocation.id, }}
                                        >Photoshoot
                                    </Link>
                                    </Nav.Link>
                                </div>
                            </Popup>) : null}
                        <Place />
                    </Marker>
                    {/* Geocoder  */}
                    <Geocoder
                        mapRef={this.mapRef}
                        onViewportChange={this.handleGeocoderViewportChange}
                        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                        position="top-left"
                    />



                    <div className="nav" style={navistyle}>
                        <NavigationControl />
                        <GeolocateControl
                            /*
                                                    style={geolocateStyle}
                            */
                            positionOptions={{ enableHighAccuracy: true }}
                            trackUserLocation={true}
                        />
                    </div>
                </MapGL>
            </div>
        );
    }
}

//navigation buttons position
const navistyle = {
    float: 'right',
    margin: '50px',
    padding: '10px'
};

MapClass.contextType = AuthContext;