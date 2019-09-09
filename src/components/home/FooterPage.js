import React from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    footer: {
        left: 0,
        marginTop:40,
        // top: '100%',
        width: '100%',
        bottom: 1,
        textAlign: 'center',
        fontSize: '12px',
    },
}));


const FooterPage = () => {
    const classes = useStyles();

    return (
        <div className={classes.footer}>
            <p>© 2019 SKP All Rights Reserved.</p>
        </div>
    );
};

export default FooterPage;