import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import CardActionArea from "@material-ui/core/CardActionArea";




export default function SnackBar() {
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const {vertical, horizontal, open} = state;

    const handleClick = newState => () => {
        setState({open: true, ...newState});
    };

    function handleClose() {
        setState({...state, open: false});
    }

    return (
        <div>

                <Button style={refButton} size="small" color="default" variant="outlined" onClick={handleClick({vertical: 'bottom', horizontal: 'center'})}>
                    Delete
                </Button>

            <Snackbar
                anchorOrigin={{vertical, horizontal}}
                key={`${vertical},${horizontal}`}
                open={open}
                onClose={handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Are you sure you want to delete?</span>}
            />
        </div>
    );
}


const refButton = {
    backgroundColor: 'ghostwhite',
    marginLeft:'10px',
};