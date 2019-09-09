import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import LoginForm from './LoginForm'
import { ModalConsumer } from "./ModalContext";
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

export default function SimpleModal() {
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
      {({ modalOpen, openModal, closeModal }) => (
        <div>
          
          <Button className={classes.button} size="small" color="default" variant="outlined"  onClick={openModal}>
            Login
          </Button>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={modalOpen}
            onClose={closeModal}
          >
            <div style={modalStyle} className={classes.paper}>
              <LoginForm closeModal={closeModal}/>
            </div>
          </Modal>
        </div>
      )}
    </ModalConsumer>
  </div>
);
}
