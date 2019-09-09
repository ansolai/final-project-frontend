import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { ModalConsumer } from '../login/ModalContext'
import SignupModal from './SignupModal'
import Button from "@material-ui/core/Button";

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 4)
    },
    button: {
        marginBottom:10,
    }
}));

export default function Signup() {
    const classes = useStyles();

    const [modalStyle] = React.useState(getModalStyle);
    /* const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
  };
  
  const handleClose = () => {
      setOpen(false);
  }; */

    return (
        <div>
            <ModalConsumer>
                {({ signupModalOpen, openSignupModal, closeSignupModal }) => (
                    <div>

                        <Button className={classes.button} size="small" color="default" variant="outlined" onClick={openSignupModal}>
                            Sign up
                        </Button>
                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={signupModalOpen}
                            onClose={closeSignupModal}
                        >
                            <div style={modalStyle} className={classes.paper}>
                                <SignupModal closeSignupModal={closeSignupModal}/>
                            </div>
                        </Modal>
                    </div>
                )}
            </ModalConsumer>
        </div>
    );
}
