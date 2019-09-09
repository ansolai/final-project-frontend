import React, {Component} from 'react';
import EditPreviousPlan, {plans} from '../EditPreviousPlan';
import NewPlan from '../NewPlan';
import {Grid, Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import moment from 'moment';
import {AuthContext} from "../../context/Authcontext";


const planUrl = '/plans/';


class PlanData extends Component {

    AuthContext = this.context;

    render() {
        console.log(this.props.plans)
        return (
            <div>
                {this.props.plans.map(plan => (

                    <Grid item key={plan.header} style={{maxWidth: '600px'}}>
                        <Card style={cardStyle}>
                            <Link to={{pathname:'/plans/'+ plan.id, state:{plan}}}  color={"inherit"} variant={"body2"}>
                                <CardActionArea className={plan.id}>
                                    <CardMedia
                                        component="img"
                                        alt="Coverphoto"
                                        height="140"
                                        image={plan.referencePictures.length ? "https://skp-datastore.s3-eu-west-1.amazonaws.com/"+plan.referencePictures[0].url : "/liskodisko.jpg"}
                                        title={plan.header}

                                    />

                                    <CardContent   style={{color: 'black'}}>
                                        <Typography gutterBottom variant="h5" component="h2">{plan.header}</Typography>
                                        <Typography component="h3">{moment(plan.date).format('LLLL')}</Typography>
                                        <Typography component="p">{plan.description}</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Link>

                            <CardActions>
                                <Link to={{pathname:'/plans/'+ plan.id + '/edit', state: {plan}}}>
                                <Button size="small" color="default" variant="outlined" >
                                    Modify
                                </Button></Link>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </div>
        );
    }
}

PlanData.contextType = AuthContext;
export default PlanData;


const cardStyle = {
    marginBottom: '10%',
    backgroundColor: 'whitesmoke',
};