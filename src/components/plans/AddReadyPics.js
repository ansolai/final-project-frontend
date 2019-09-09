import React, {useContext} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import ImageDropZone from "./ImageDropZone";
import {AuthContext} from "../context/Authcontext";
import EditPreviousPlan2 from "./EditPreviousPlan2";


const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },

});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const ImageDrop = withStyles(theme => ({
    imagedrop: {
        paddingLeft:100,
    },
}));

export default function AddReadyPics(props) {

    const [values, setValues] = React.useState({
        readyPictures: props.readyPictures,
    });

    const exportData = useContext(AuthContext);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange =  event => {
        setValues({...values, readyPictures: [...values.readyPictures, event.target.files[0]]});
        console.log(values.readyPictures)
    };

    const sendPics = (event) => {
        event.preventDefault();
        console.log("AddReadyPics, plan id and values : ",props.planid, values);
        exportData.addReadyPictures(props.planid, values);
        // props.update();
        handleClose();
    };

    return (
        <div>
            <Button variant="outlined"  color="default"  onClick={handleClickOpen}>
                Add your photos
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Your own photos from the photoshoot
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Took some neat photos at your photoshoot and you want to archive them to your plan? You can add them afterwards here!
                    </Typography>
                </DialogContent>
                <div
                value={values.readyPictures}
                onChange={handleChange}
                >
                <ImageDropZone style={ImageDrop.imagedrop}/>
                </div>


                <DialogActions>
                    <Button onClick={handleClose} size="small" color="default" variant="outlined">
                        Delete
                    </Button>
                    <Button onClick={sendPics} size="small" color="default" variant="outlined">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

AddReadyPics.contextType = AuthContext;
