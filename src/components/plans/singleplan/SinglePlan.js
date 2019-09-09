import React, { Component } from 'react'
import { Consumer, AuthContext } from "../../context/Authcontext";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Container from '@material-ui/core/Container'
import AwesomeSlider from 'react-awesome-slider';
import AwsSliderStyles from './AWSSlider.css'
import 'react-awesome-slider/dist/styles.css';
import CardActionArea from "@material-ui/core/CardActionArea";
import Map from "../../map/Maptest";
import CardMedia from "@material-ui/core/CardMedia";
import {plans} from "../EditPreviousPlan";
import Download from "./Download";
import moment from 'moment';
import Button from '@material-ui/core/Button/index';
import {Link} from "react-router-dom";
import {Redirect} from "react-router-dom";



export default class SinglePlan extends Component {

    state = {
        plan: "",
        isHidden: true,
        showButton: 'Show',
        redirect: false,
        // referencePictures: '',
    };


    /*Toggle for hiding and showing the map component*/
    toggleHidden() {
        this.setState({
            isHidden: !this.state.isHidden,
            showButton: 'Hide',
        })
    };

    /*Redirecting back to the /plan site*/
    setRedirect = () => {this.setState({redirect: true})};
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/plan' />
        }
    };

    AuthContext = this.context;

    componentDidMount(props) {
        this.context.getData("plans/" + this.props.match.params.id).then(res => this.setState({plan: res}))
        console.log( "componentDidMount: " + this.state.plan)
    }
    /*Muutos method hides AwsomeSlider if ready pictures do not exist. If they do, then they are shown in a slider.*/

    muutos = () =>{
        return {
            display: this.state.plan.readyPictures && this.state.plan.readyPictures.length ===0? 'none':'visible'}}

    render() {

        const {id, date, description, header, location, notes, participants, latitude, longitude, referencePictures, readyPictures} = this.state.plan;

        return (
          <div>
            <Box style={style.boxWrapper}>
              <div>
                {this.renderRedirect()}
                <Button
                  variant="outlined"
                  size="small"
                  style={style.buttonClose}
                  onClick={this.setRedirect}
                >
                  X
                </Button>
              </div>
              <div>
                <Download
                  id={id}
                  date={date}
                  header={header}
                  description={description}
                  participants={participants}
                  location={location}
                  notes={notes}
                  latitude={latitude}
                  longitude={longitude}
                  referencePictures={referencePictures}
                />

                <CardContent>
                  <Card className="paper">
                    <Typography variant="h4">
                      <CardContent>{header}</CardContent>
                      {
                        <h6 variant="h6" style={style.textStyle}>
                          {" "}
                          Date & Time: {moment(date).format("LLLL")}
                        </h6>
                      }
                    </Typography>
                  </Card>
                </CardContent>

                {readyPictures && (
                  <Container maxWidth="lg" style={this.muutos()}>
                    <Paper className="root" style={style.sliderStyle}>
                      <AwesomeSlider cssModule={AwsSliderStyles}>
                        {readyPictures.map(picture => (
                          <div
                            data-src={
                              "https://skp-datastore.s3-eu-west-1.amazonaws.com/" +
                              picture.url
                            }
                          />
                        ))}
                      </AwesomeSlider>
                    </Paper>
                  </Container>
                )}
                <Grid>
                  <Grid container style={style.rootStyle} spacing={2}>
                    <Grid item xs>
                      <CardContent>
                        <Card className="paper" style={style.cardStyle}>
                          <Typography variant="h5">
                            <CardContent>Description</CardContent>
                            <Typography component="p" style={style.textStyle}>
                              {description}
                            </Typography>
                          </Typography>
                        </Card>
                      </CardContent>
                      <CardContent>
                        <Card className="paper" style={style.cardStyle}>
                          <Typography variant="h5">
                            <CardContent>Participants</CardContent>
                            <Typography component="p" style={style.textStyle}>
                              {participants}
                            </Typography>
                          </Typography>
                        </Card>
                      </CardContent>
                      <CardContent>
                        <Card className="paper" style={style.cardStyle}>
                          <Typography variant="h5">
                            <CardContent>Notes</CardContent>
                            <Typography component="p" style={style.textStyle}>
                              {notes}
                            </Typography>
                          </Typography>
                        </Card>
                      </CardContent>
                      <CardContent>
                        <Card className="paper" style={style.cardStyle}>
                          <Typography variant="h5">
                            <CardContent>Location</CardContent>
                            <Typography component="p" style={style.textStyle}>
                              {location}
                            </Typography>
                          </Typography>
                        </Card>
                      </CardContent>
                    </Grid>
                  </Grid>

                  <CardContent>
                    <Card>
                      <div>
                        <Button
                          style={style.buttonShow}
                          variant="outlined"
                          size="small"
                          onClick={this.toggleHidden.bind(this)}
                        >
                          {this.state.showButton}
                        </Button>
                        <p style={style.textStyle}>
                          Photoshoots location on map
                        </p>
                      </div>
                      {!this.state.isHidden && (
                        <div style={style.mapWrapper}>
                          <Map width={"65vw"} height={"50vh"} />
                        </div>
                      )}
                    </Card>
                  </CardContent>
                </Grid>
              </div>

              {referencePictures && (
                <Grid container spacing={3} style={style.gridPic}>
                  {referencePictures.map(pic => (
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

              <Link
                to={{
                  pathname: "/plans/" + this.state.plan.id + "/edit",
                  state: this.state
                }}
              >
                <Button
                  size="small"
                  color="default"
                  variant="outlined"
                  style={style.button}
                >
                  Modify
                </Button>
              </Link>
            </Box>
          </div>
        );
    }
}

const style = {

    pic :{
        justify: 'center',
        alignItems: 'center'
},
    gridPic: {
        justify: 'center',
        alignItems: 'center',
        margin: '0 auto',
        paddingRight: '5%',
        paddingTop:'5%',
        paddingBottom: '5%',
        borderRadius: 'borderRadius',
},
    rootStyle: {
        flexGrow: 1,
        direction: 'row',
        justify: 'space-evenly',
        alignItems:'flex-start',
},
    sliderStyle: {
        marginBottom: '30px',
        justify: 'center',
        alignItems: 'center',
        maxWidth: '50 %',
        height: 'auto'
},
    boxWrapper: {
        borderRadius: 'borderRadius',
        bgcolor: 'background.paper',
        borderColor: 'text.primary',
        m: 1,
        border: 1,
        width: '75%',
},
    menuStyle: {
        width: '90%',
        paddingLeft: '15px',
        marginLeft: '10',
},
    textStyle: {
        marginLeft: '10',
        width: '90%',
        paddingLeft: '15px',
        paddingBottom:'10px',
},
    cardStyle: {
    // width: '50%',
    },
    mapWrapper: {
        bgcolor: 'background.paper',
        borderColor: 'text.primary',
        m: 1,
        border: 1,
        width: '75%',
        padding: '3%',
    },
    buttonShow: {
        alignItems: 'left',
        display: 'flex',
        margin:'10px',
    },
    refButtonArea: {
        margin: '10px',
        // display: 'flex',
    },
    button: {
        backgroundColor: 'ghostwhite',
        display: 'flex',
        marginLeft:'auto',
        marginBottom: 10,

    },
    buttonClose: {
        display: 'flex',
        padding: 7,
        margin: 10,
        backgroundColor: 'ghostwhite',
        marginLeft:'auto',
        border: "1px solid #4a4a4a",
    },
    buttonPic: {
        display: 'flex',
        padding: 3,
        margin: 5,
        backgroundColor: 'ghostwhite',
        marginLeft:'auto',
        border: "1px solid #4a4a4a",
    },

};
    SinglePlan.contextType = AuthContext;
