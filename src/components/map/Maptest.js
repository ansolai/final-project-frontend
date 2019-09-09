import React, { Component } from "react";
import { CameraAlt, Place } from "@material-ui/icons";
import MapGL, {
  GeolocateControl,
  Marker,
  Popup,
  NavigationControl
} from "react-map-gl";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import Geocoder from "react-map-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import { AuthContext } from "../context/Authcontext";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { testSun } from "./suncalc";
import DatePicker from "./DatePicker";
import { Box } from "@material-ui/core";
import { addMapLayers } from "./mapsetup.js";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import SunPositionOverlay from "./SunPositionOverlay";

var SunCalc = require("suncalc");

export default class MapClass extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      viewport: {
        latitude: 60.16741,
        longitude: 24.942577,
        height: props.height ? props.height : "100vh",
        width: props.width ? props.width : "100vw",
        zoom: 10
      },
      marker: {
        longitude: 24.94,
        latitude: 60.16
      },
      events: {},
      selectedPark: null,
      popupInfo: null,
      locations: [],
      selectedLocation: null,
      date: this.props.date ? props.date : new Date(),
      suncalc: {},
      sunriseHour: null,
      sunriseMin: null,
      sunsetHour: null,
      sunsetMin: null
    };
  }
  componentDidMount() {
    this.setState({ marker: this.state.marker });
    this.context
      .getData("plans")
      .then(res => this.setState({ locations: res }));
    const listener = e => {
      if (e.key === "Escape") {
        this.setState({ selectedLocation: null });
      }
    };
    window.addEventListener("keydown", listener);

    const suncalc = SunCalc.getTimes(
      this.state.date,
      this.state.viewport.latitude,
      this.state.viewport.longitude
    );
    this.setState({
      suncalc: SunCalc.getTimes(
        this.state.date,
        this.state.marker.latitude,
        this.state.marker.longitude
      )
    });
    const sunrise = suncalc.sunrise;
    this.setState({
      sunriseMin: sunrise.getMinutes(),
      sunriseHour: sunrise.getHours()
    });
    const sunset = suncalc.sunset;
    this.setState({
      sunsetMin: sunset.getMinutes(),
      sunsetHour: sunset.getHours()
    });

    const map = this.mapRef.current.getMap();
    addMapLayers(map);
  }

  testRef = (x, y) => {
    const map = this.mapRef.current.getMap();

    map.getSource("sun").setData({
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: [
          [y, x],
          [this.state.viewport.longitude, this.state.viewport.latitude]
        ]
      },
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-color": "#888",
        "line-width": 8
      }
    });
  };

  updateViewport = viewport => {
    this.setState({ viewport });
    /* this.setState({marker: viewport}) */
  };

  logDragEvent(name, event) {
    this.setState({
      events: {
        ...this.state.events,
        [name]: event.lngLat
      }
    });
  }

  onMarkerDragStart = event => {
    this.logDragEvent("onDragStart", event);
  };

  onMarkerDrag = event => {
    this.logDragEvent("onDrag", event);
  };

  onMarkerDragEnd = event => {
    this.logDragEvent("onDragEnd", event);
    this.setState({
      marker: {
        longitude: event.lngLat[0],
        latitude: event.lngLat[1]
      }
    });
    this.handleViewportChange({
      longitude: event.lngLat[0],
      latitude: event.lngLat[1]
    });
    // this.props.handleCoordinates({target: {longitude: event.lngLat[0], latitude: event.lngLat[1]}});
  };

  handleDateChange = () => {
    var times = SunCalc.getTimes(
      this.state.date,
      this.state.viewport.latitude,
      this.state.viewport.longitude
    );
    var sunrisePos = SunCalc.getPosition(
      this.state.date,
      this.state.viewport.latitude,
      this.state.viewport.longitude
    );
    this.setState({ suncalc: times });
    var sunriseAzimuth = (sunrisePos.azimuth * 180) / Math.PI;
    const coords = testSun(
      this.state.viewport.latitude,
      this.state.viewport.longitude,
      sunriseAzimuth,
      100
    );

    const suncalc = SunCalc.getTimes(
      this.state.date,
      this.state.viewport.latitude,
      this.state.viewport.longitude
    );
    this.setState({
      suncalc: SunCalc.getTimes(
        this.state.date,
        this.state.marker.latitude,
        this.state.marker.longitude
      )
    });
    const sunrise = suncalc.sunrise;
    this.setState({
      sunriseMin: sunrise.getMinutes(),
      sunriseHour: sunrise.getHours()
    });
    const sunset = suncalc.sunset;
    this.setState({
      sunsetMin: sunset.getMinutes(),
      sunsetHour: sunset.getHours()
    });
    this.testRef(coords.x, coords.y);
  };

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
    this.handleDateChange();
  };

  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  };

  handleHourChange = (e, value) => {
    const olddate = this.state.date;
    olddate.setHours(value);
    this.setState({ date: olddate });
    this.handleDateChange();
  };

  handleMinuteChange = (e, value) => {
    const olddate = this.state.date;
    olddate.setMinutes(value);
    this.setState({ date: olddate });
    this.handleDateChange();
  };

  handleCalendarChange = date => {
    this.setState({ date: date });
    this.handleDateChange();
  };
  render() {
    const {
      viewport,
      sunriseMin,
      sunriseHour,
      sunsetMin,
      sunsetHour
    } = this.state;
    return (
      <Box style={{ height: "100%", width: "100%", paddingLeft: 2 }}>
        <DatePicker
          date={this.state.date}
          handleHourChange={this.handleHourChange}
          handleMinuteChange={this.handleMinuteChange}
          handleCalendarChange={this.handleCalendarChange}
          sunriseHour={sunriseHour}
          sunsetHour={sunsetHour}
        />

        <div>
          <MapGL
            ref={this.mapRef}
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            onViewportChange={this.updateViewport}
          >
            {!this.state.locations.length
              ? null
              : this.state.locations.map(loc => {
                  return (
                    <Marker
                      key={loc.id}
                      mapRef={this.mapRef}
                      latitude={Number(loc.latitude)}
                      longitude={Number(loc.longitude)}
                    >
                      <CameraAlt
                        mapRef={this.mapRef}
                        onClick={e => {
                          e.preventDefault();
                          this.setState({ selectedLocation: loc });
                        }}
                      />
                    </Marker>
                  );
                })}

            {/* Popup when clicked photoshoot-location */}
            {this.state.selectedLocation ? (
              <Popup
                mapRef={this.mapRef}
                tipSize={5}
                anchor="top"
                longitude={this.state.selectedLocation.longitude}
                latitude={this.state.selectedLocation.latitude}
                closeOnClick={false}
                onClose={() => this.setState({ selectedLocation: null })}
              >
                <div>
                  <Typography variant="h2" gutterBottom>
                    {this.state.selectedLocation.description}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    {moment(this.state.selectedLocation.date).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  </Typography>
                  <Nav.Link>
                    <Link
                      to={{
                        pathname: "/plans/" + this.state.selectedLocation.id
                      }}
                    >
                      Photoshoot
                    </Link>
                  </Nav.Link>
                </div>
              </Popup>
            ) : null}

            {/*  Draggable marker  */}

            <Marker
              mapRef={this.mapRef}
              latitude={this.state.viewport.latitude}
              longitude={this.state.viewport.longitude}
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
                  longitude={this.state.selectedLocation.location}
                  latitude={this.state.selectedLocation.location}
                  closeOnClick={false}
                  onClose={() => this.setState({ popupInfo: null })}
                >
                  <div>
                    <Typography variant="h2" gutterBottom>
                      {this.state.selectedLocation.description}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      {moment(this.state.selectedLocation.date).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </Typography>
                    {/* <h2>{this.state.selectedLocation.description}</h2>
                                    <p>{this.state.selectedLocation.date}</p> */}
                    <Nav.Link>
                      <Link
                        to={{
                          pathname: "/plans/" + this.state.selectedLocation.id
                        }}
                      >
                        Photoshoot
                      </Link>
                    </Nav.Link>
                  </div>
                </Popup>
              ) : null}
              <Place />
            </Marker>
            {/* Geocoder  */}
            
              <Geocoder
                mapRef={this.mapRef}
                onViewportChange={this.handleGeocoderViewportChange}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                position="top-right"
              />
              <SunPositionOverlay
                suncalc={this.state.suncalc}
                date={this.state.date}
              ></SunPositionOverlay>
            

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
      </Box>
    );
  }
}



//geolocation button position
const geolocateStyle = {
  float: "left",
  margin: "50px",
  padding: "10px"
};
//navigation buttons position
const navistyle = {
  float: "right",
  margin: "50px",
  padding: "10px"
};

MapClass.contextType = AuthContext;
