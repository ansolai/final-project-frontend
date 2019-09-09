import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Map from "../map/Map";
import {AuthContext} from "../context/Authcontext";
import EditPreviousPlan from "./EditPreviousPlan";
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ImageDropZone from "./ImageDropZone";
import {Redirect} from "react-router-dom";
import history from '../../router/history';
import SnackbarConfirm from './SnackbarConfirm';
import AddReadyPics from './AddReadyPics';
import AddReferencePictures from './AddReferencePictures';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";


// const plans = [];

class EditPreviousPlan2 extends Component {

    /*Propsit tuodaan luokasta .singlePlan/PlanData */
    state= {
        id: this.props.location.state.plan.id,
        header: this.props.location.state.plan.header,
        date:this.props.location.state.plan.date,
        location:this.props.location.state.plan.location,
        coordinates:this.props.location.state.plan.coordinates,
        latitude: this.props.location.state.plan.latitude,
        longitude: this.props.location.state.plan.longitude,
        participants:this.props.location.state.plan.participants,
        description:this.props.location.state.plan.description,
        notes:this.props.location.state.plan.notes,
        referencePictures: this.props.location.state.plan.referencePictures,

        readyPictures: this.props.location.state.plan.readyPictures,
        suninfo: this.props.location.state.plan.suninfo,
        newReferencePictures: [],
        newReadyPictures: [],
        // isReady: true,
    };

    setRedirect = () => {
        this.props.history.push('/plan');
    };

    AuthContext = this.context;

    headerChange = (event) => {this.setState({header: event.target.value})};
    dateChange = date => {this.setState({date: date})};
    locationChange = (event) => {this.setState({location: event.target.value})};
    coordinatesChange = (event) => {
        this.setState ({coordinates: event.target, longitude: event.target.longitude, latitude: event.target.latitude})};
    participantsChange = (event) => {this.setState({participants: event.target.value})};
    descriptionChange = (event) => {this.setState({description: event.target.value})};
    notesChange = (event) => {this.setState({notes: event.target.value})};
    referencePicChange = (event) => {this.setState({referencePictures: event.target.value})};
    readyPicturesChange = (event) => {this.setState({readyPictures: event.target.value})};
    suninfoChange = (event) => {this.setState({suninfo: event.target.value})};
    newReferencePicChange = (event) => {this.setState({newReferencePictures: event.target.value})};
    newReadyPicturesChange = (event) => {this.setState({newReadyPictures: event.target.value})};

    deleteThisPlan = (event) => {
        event.preventDefault();
        this.context.deletePlan(this.state.id);
        this.setRedirect();
        console.log("deletoi: " + this.state.id)
    };

    editPlan = (event) => {
        event.preventDefault();
        this.context.updateData(this.state.id, this.state);
        this.setRedirect();
        console.log('editPlan', this.props.location.state.plan);
    };

    deleteRefePic = (event) => {
        event.preventDefault();
        const id = event.target.getAttribute("id");
        this.context.deleteReference(id);
        console.log("trying to del refPic with id: ", event)
    };

    updatePage = () => {
        /*hack here updates*/
        console.log("updatePage function in action, trying force update");
        this.forceUpdate();
    };

    hide = () => {
        return {
            display: this.state.readyPictures && this.state.readyPictures.length ===0? 'none':'visible'}
    };

    render() {

        return (
          <div style={styling.root}>
            <Box borderRadius="borderRadius" style={styling.boxWrapper}>
              <div style={styling.buttonArea}>
                <Button
                  variant="outlined"
                  size="small"
                  style={styling.buttonClose}
                  onClick={this.setRedirect}
                >
                  X
                </Button>
              </div>
              <div style={styling.menu}>
                <h3>Edit your plan details</h3>
              </div>

              <form style={styling.container} noValidate autoComplete="off">
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-name"
                      label="Photoshoot name"
                      style={styling.TextFieldWide}
                      placeholder={this.props.header}
                      value={this.state.header}
                      onChange={this.headerChange}
                      margin="normal"
                      variant="outlined"
                      float="center"
                    />
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        placeholder={this.props.description}
                        value={this.state.description}
                        onChange={this.descriptionChange}
                        style={styling.TextFieldNarrow}
                        multiline
                        margin="normal"
                        variant="outlined"
                        rows="2"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="outlined-multiline-static"
                        label="Participants"
                        placeholder={this.props.participants}
                        value={this.state.participants}
                        onChange={this.participantsChange}
                        multiline
                        style={styling.TextFieldNarrow}
                        margin="normal"
                        variant="outlined"
                        rows="2"
                      />
                    </Grid>
                  </Grid>
                  <h5>Reference pictures:</h5>
                  {this.state.referencePictures && (
                    <Grid container spacing={3} style={styling.gridPic}>
                      {this.state.referencePictures.map(pic => (
                        <Grid item xs={12} sm={6}>
                          <Card>
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                alt="Your reference picture"
                                height="150"
                                image={
                                  "https://skp-datastore.s3-eu-west-1.amazonaws.com/" +
                                  pic.url
                                }
                                title="Your reference picture"
                              />
                            </CardActionArea>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  )}

                  <Grid items xs={12}>
                    <div
                      style={styling.imagedrop}
                      value={this.state.newReferencePictures}
                      onChange={this.newReferencePicChange}
                    >
                      <p>
                        Add more reference pictures! You can have max. 5 per
                        plan.
                      </p>

                      <AddReferencePictures
                        planid={this.state.id}
                        update={this.updatePage}
                      />
                    </div>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="outlined-notes"
                      label="Notes"
                      placeholder={this.props.notes}
                      value={this.state.notes}
                      onChange={this.notesChange}
                      multiline
                      style={styling.TextFieldWide}
                      margin="normal"
                      variant="outlined"
                      float="center"
                      rows="10"
                    />
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="outlined-multiline-static"
                        label="Photoshoot location"
                        placeholder={this.props.location}
                        value={this.state.location}
                        onChange={this.locationChange}
                        style={styling.TextFieldNarrow}
                        multiline
                        margin="normal"
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <div
                        style={styling.calendar}
                        placeholder={this.props.date}
                        value={this.state.date}
                        onChange={this.dateChange}
                      >
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <DateTimePicker
                            ampm={false}
                            inputVariant="outlined"
                            value={this.state.date}
                            onChange={this.dateChange}
                            label="Select Date and Time"
                            showTodayButton
                            margin="normal"
                          />
                        </MuiPickersUtilsProvider>
                      </div>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <h6>
                      You can also pinpoint your planned location on map
                      <br></br>
                    </h6>
                    <p>
                      By changing the date shown on map, the suns location will
                      change.
                    </p>

                    <div style={styling.mapWrapper}>
                      <Map
                        width={"65vw"}
                        height={"50vh"}
                        value="this.state.coordinates"
                        onChange={this.coordinatesChange}
                        handleCoordinates={this.coordinatesChange}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-name"
                      label="Sunrise | Sunset | Golden hours"
                      style={styling.TextFieldWide}
                      placeholder="Sunrise | Sunset | Golden hours"
                      value="Sunrise | Sunset | Golden hours"
                      margin="normal"
                      variant="outlined"
                      float="center"
                    />
                  </Grid>

                  <Grid items xs={12}>
                    <div
                      style={styling.imagedrop}
                      value={this.state.newReadyPictures}
                      onChange={this.newReadyPicturesChange}
                    >
                      <p>
                        Took some neat photos at your photoshoot? Add them
                        afterwards here!
                        <br></br> You can add up to 5 pictures per plan.
                      </p>

                      <AddReadyPics
                        readyPictures={this.state.newReadyPictures}
                        planid={this.state.id}
                        update={this.updatePage}
                      />
                      <div>
                        <div style={this.hide()}>
                          <p style={styling.paragraph}>
                            Previously added photos:
                          </p>
                          <Grid container spacing={3} style={styling.gridPic}>
                            {this.state.readyPictures.map(pic => (
                              <Grid item xs={12} sm={6}>
                                <Card>
                                  <CardActionArea>
                                    <CardMedia
                                      component="img"
                                      alt="Your picture"
                                      height="150"
                                      image={
                                        "https://skp-datastore.s3-eu-west-1.amazonaws.com/" +
                                        pic.url
                                      }
                                      title="Your picture"
                                    />
                                    <div style={styling.buttonArea}></div>
                                  </CardActionArea>
                                </Card>
                              </Grid>
                            ))}
                          </Grid>
                        </div>
                      </div>
                    </div>
                  </Grid>
                </Grid>
                <div style={styling.buttonAreaBottom}>
                  <Button
                    style={styling.button}
                    size="small"
                    color="default"
                    variant="outlined"
                    onClick={this.deleteThisPlan}
                  >
                    Delete
                  </Button>
                  <Button
                    style={styling.button}
                    size="small"
                    color="default"
                    variant="outlined"
                    onClick={this.editPlan}
                  >
                    Save
                  </Button>
                </div>
              </form>
            </Box>
          </div>
        );
    }
}

const styling = {
    root: {
        flexGrow: 1,
        padding: '5%',
        // backgroundColor: 'yellow',
        paddingBottom:80,
    },
    boxWrapper: {
        backgroundColor: 'ghostwhite',
        paddingTop: '5%',
        paddingRight: '5%',
        paddingLeft: '5%',
        paddingBottom:80,
    },
    menu:{
      paddingTop: 20,
        paddingBottom: 20,
    },
    mapWrapper: {
        // backgroundColor: 'lightblue',
        padding: '3%',
        borderRadius: 5,
    },
    container: {
        direction: 'row',
        justify: 'center',
        marginLeft: '20',
    },
    TextFieldWide:{
        width:'100%',
    },
    TextFieldNarrow : {
        width:'100%',
        padding: '3%',
    },
    gridPic: {
        justify: 'center',
        alignItems: 'center',
        margin: '0 auto',
        paddingTop:'5%',
        paddingBottom: '5%',
        borderRadius: 'borderRadius',
    },
    buttonArea: {
        float: 'right',
    },
    buttonClose: {
        backgroundColor: 'ghostwhite',
        padding: 3,
    },
    buttonAreaBottom: {
        float: 'right',
        paddingTop:20,
        paddingBottom: 50,
    },
    button: {
        backgroundColor: 'ghostwhite',
        padding: 3,
        margin: 4,
    },
    buttonPic: {
        display: 'flex',
        padding: 3,
        margin: 5,
        backgroundColor: 'ghostwhite',
        marginLeft:'auto',
        border: "1px solid #4a4a4a",
    },
    calendar: {
        padding: '3%',
        color: 'black',

    },
    imagedrop: {
        width: '100%',
        padding:'3%',
    },
    paragraph:{
        paddingTop:10,
        paddingBottom: 10,
    },
};

EditPreviousPlan2.contextType = AuthContext;
export default EditPreviousPlan2;


/*
*Button for deleting readyPictures
* <Button size="small" variant="outlined"  style={styling.buttonPic}>Delete</Button>
*
*Button for deletinf referenceictures
*<div style={styling.buttonArea}>
*<Button key={pic.id} id={pic.id} size="small" variant="outlined"  style={styling.buttonPic} onClick={this.deleteRefePic}>Delete</Button>
*</div>
*/