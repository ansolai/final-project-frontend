import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Modal from '@material-ui/core/Modal';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import {Grid, Typography} from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import NewPlan from "./NewPlan";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import { Redirect } from "react-router-dom";


// function rand() {
//     return Math.round(Math.random() * 20) - 10;
// }

// function getModalStyle() {
//     const top = 50 + rand();
//     const left = 50 + rand();
//
//     return {
//         top: `${top}%`,
//         left: `${left}%`,
//         transform: `translate(-${top}%, -${left}%)`,
//     };
// }


const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        position: 'absolute',
        overflow: 'scroll',
        scroll: 'paper',
        padding: theme.spacing(2),
    },

}));

export default function PlanModal(){
    const classes = useStyles();
    // const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false)
        return <Redirect to='/plan' />
    };

    return (
        <div>

            <Card style={{backgroundColor:'whitesmoke'}}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Your coverphoto"
                        height="140"
                        image="https://images.unsplash.com/photo-1566410854867-0fdf0b435ffa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                        title="Your plan coverphoto"
                        onClick={handleOpen}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">Make a new plan!</Typography>
                        <Typography component="p">Click Create and make a new photoshoot plan</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="default" variant="outlined" onClick={handleOpen}>
                        Create
                    </Button>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={open}
                        onClose={handleClose}
                        className={classes.paper}
                        disableBackdropClick={true}
                    >
                        <NewPlan handleClose={handleClose}/>
                    </Modal>

                </CardActions>
            </Card>
        </div>
    )
}