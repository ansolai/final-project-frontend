import React, {Component} from 'react'
import {AuthContext} from "../context/Authcontext";
import Map from "../map/Map";
import ImageDropZone from "./ImageDropZone";
import TextField from '@material-ui/core/TextField/index';
import Button from '@material-ui/core/Button/index';
import Box from '@material-ui/core/Box';
import {Redirect} from "react-router-dom";
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const plans = [];


/*
* Älä käytä tätä
* tämä on vanha versio
*
* */

class EditPreviousPlan extends Component {
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
        redirect: false
    };

    setRedirect = () => {this.setState({redirect: true})}
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/plan' />
        }
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

/*
    referencePicChange = (event) => {this.setState({referencePictures: event.target.value})};
*/



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
        //updatePlan(this.state.id, this.state);
        console.log('editPlan', this.props.location.state.plan);
    };
    close = () => {


    };

    render (){
        console.log(this.props.location.state);

        return (
        <div>
            <Box borderRadius="borderRadius" {...boxWrapper}>
                <div >
                    {this.renderRedirect()}
                    <Button  variant="outlined" size="small" style={styling.button} onClick={this.setRedirect}>X</Button>
                </div>
                <div style={styling.menu}>

                    <h3>Edit your plan details</h3>

                </div>


                <form style={styling.container} noValidate autoComplete="off">

                    <TextField
                        id="outlined-name"
                        label="Photoshoot name"
                        style={styling.textField}
                        placeholder={this.props.header}
                        value={this.state.header}
                        onChange={this.headerChange}
                        margin="normal"
                        variant="outlined"
                        float="center"
                    />
                    <TextField
                        id="outlined-description"
                        label="Description"
                        placeholder={this.props.description}
                        value={this.state.description}
                        onChange={this.descriptionChange}
                        multiline
                        style={styling.textField}
                        margin="normal"
                        variant="outlined"
                        float="center"
                        rows="4"
                    />

                    <TextField
                        id="outlined-participants"
                        label="Participants"
                        placeholder={this.props.participants}
                        value={this.state.participants}
                        onChange={this.participantsChange}
                        multiline
                        style={styling.textField}
                        margin="normal"
                        variant="outlined"
                        float="center"
                        rows="4"
                    />
                    <TextField
                        id="outlined-notes"
                        label="Notes"
                        placeholder={this.props.notes}
                        value={this.state.notes}
                        onChange={this.notesChange}
                        multiline
                        style={styling.textField}
                        margin="normal"
                        variant="outlined"
                        float="center"
                        rows="10"
                    />
                    <TextField
                        id="outlined-location"
                        label="Photoshoot location"
                        style={styling.textField}
                        placeholder={this.props.location}
                        value={this.state.location}
                        onChange={this.locationChange}
                        margin="normal"
                        variant="outlined"
                        float="center"
                    />
                    <div  style={styling.mapWrapper}>
                        <h6>You can also pinpoint your planned location on map
                            <br></br>
                        </h6>
                        <p>By changing the date shown on map, the suns location will change.</p>

                        <Map width={'65vw'} height={'50vh'} value={this.state.coordinates}
                             onChange={this.coordinatesChange}
                             handleCoordinates={this.coordinatesChange} />

                    </div>

                    <div
                        style={styling.calendar}
                        placeholder={this.props.date}
                        value={this.state.date}
                        onChange={this.dateChange}>
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


                </form>

                <div>
                    <Button  style={styling.button} size="small" color="default" variant="outlined" onClick={this.editPlan}>
                        Save
                    </Button>
                </div>
                <div>
                    <Button style={styling.button} size="small" color="default" variant="outlined" onClick={this.deleteThisPlan}>
                        Delete
                    </Button>
                </div>
            </Box>
        </div>

        )
    }
}

const styling = {
    container: {
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        direction: 'row',
        justify: 'center',
        marginLeft: '20',
    },
    textField: {
        width: '75%',
    },
    button: {
        backgroundColor: 'ghostwhite',
        marginLeft:'85%',
        marginBottom: 30
    },
    buttonClose: {
        display: 'flex',
        padding: 3,
    },
    menu: {
        width: 300,
        alignItems: 'left',
        margin: 20,
    },
    calendar: {
        width:'100%',
        marginTop: 30,
        marginBottom: 30,
    },
    imagedrop: {
        width:'75%',
    },
};

const boxWrapper = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    border: 1,
    width: '85%',
    paddingLeft: 3,
};

const mapWrapper= {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    border: 1,
    width: '100%',

};


EditPreviousPlan.contextType = AuthContext;
export default EditPreviousPlan;
