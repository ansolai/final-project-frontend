import React, {useState, useContext} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Form } from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import { AuthContext } from '../context/Authcontext';

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

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
    },
}));

export default function CustomizedDialogs(props) {
    const [open, setOpen] = React.useState(false);
    const [file, setFile] = useState("");
    const [msg, setMsg] = useState("");
    const kontekst = useContext(AuthContext);

    const classes = useStyles();
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (e) => {
        setOpen(false);
    };
    
const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.set("content", msg);
    formData.append("image", file);
    props.postMsg(formData);
}
    
    const handleInputChange = (e) => {
        setMsg(e.target.value)
    }
    const handleFileChange = (e) => {
        setFile(e.target.files[0])    
    }

    return (
        <div>
            
            <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.show}>
                <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
                    Post new picture
        </DialogTitle>
                <DialogContent dividers>
                    <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Typography gutterBottom>
                        <TextField
                            id="outlined-dense-multiline"
                                label="Message"
                                value={msg}
                                onChange={handleInputChange}
                            className={clsx(classes.textField, classes.dense)}
                            margin="dense"
                            variant="outlined"
                            multiline
                            rowsMax="4"
                            />
                            <hr></hr>
                            <Form.Group controlId="formBasicFile">
                                <Form.Label>Picture</Form.Label>
                                <Form.Control type="file" name="file" onChange={handleFileChange} />
                            </Form.Group>                            
          </Typography>
                            </form>
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} color="primary">
                        Post
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}