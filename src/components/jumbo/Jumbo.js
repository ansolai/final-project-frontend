import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import Background from './test.jpg';

class Jumbo extends Component {
    render() {

        return (
            <Jumbotron style={styles.container}>

                <h1><strong>SKP</strong> </h1>
                <h5>Suomen Kuva Palvelu</h5>

            </Jumbotron>
        );
    }
}


const styles = {
    container: {
        backgroundSize: 'cover',
        height: "800px",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'red',
        backgroundImage: `url(${Background})`,
        borderRadius: "0px",
        textAlign: "center",
        /*
                display: "flex"
        */


    }

};



export default Jumbo;