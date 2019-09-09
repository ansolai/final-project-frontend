import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField/index';
import {Container} from "@material-ui/core";


class About extends Component {
    render() {
        return (
            <div style={{marginTop:50}}>

                <Container maxWidth="xl" style={styles.container}>

                    <img src="/pics/tomas-malik-MODPxoyttL8-unsplash.jpg" style={styles.backgrnd}/>

                    <form style={styles.form}>
                    <h3>ABOUT</h3>
                    <br></br>

                    <h6>
                        This platform is made for photographers to assist you in your photoshoot-planning process.
                        With SKP-Suomen Kuvapalvelu you can:
                    </h6>
                    </form>
                </Container>

            <Container  maxWidth="xl" style={styles.container}>

                <img src="/pics/kurt-cotoaga-cqbLg3lZEpk-unsplash.jpg" style={styles.backgrnd}/>
                    <form style={styles.form2}>

                        <div style={styles.p}>
                            <p>Plan your upcoming photoshoot</p>
                            <p>Upload reference pictures</p>
                            <p>Check out the coordinates for your shoot in order to see
                                the location of the sun relative to the position</p>
                            <p>Save and share your photoshoot with your team</p>
                            <p>Go through old photoshoots in order to get inspiration</p>
                            <p>Create your free account today to start
                                planning your photoshoots in a professional way!</p>
                        </div>
                    </form>
            </Container>


                <Container  maxWidth="xl" style={styles.container}>

                    <img src="/pics/kyle-cesmat-5wZ3iImG-I4-unsplash.jpg" style={styles.backgrnd}/>
                    <form  style={styles.form3}>

                            <h5>WHY?</h5>
                            <p>
                                The idea for SKP -Suomen Kuvapalvelu was brought forward by Anna Laitila in a pitch
                                to the Academy.fi Java-class summer of 2019 final project. After she pitched her plan
                                the team quickly got together and started planning on how to go from an idea to a working
                                web app. SKP -Suomen Kuvapalvelu was released only two weeks after the project started.
                                Stay tuned for updates!
                            </p>
                    </form>
                </Container>


                <Container  maxWidth="xl" style={styles.container}>

                    <img src="/pics/josh-felise-VrtbeywxXDw-unsplash.jpg" style={styles.backgrnd}/>
                    <form  style={styles.form4}>
                        <h5>WHO?</h5>
                        <p>Anna Laitila -Product Owner and a mean front-end trickster
                            <br></br>
                        Samuli Sorjonen -Back-end ninja and a solid all-round developer
                            <br></br>
                        Teemu Pulli -Git-enforcer and the team cloud-master
                            <br></br>
                        Iiris Setälä - The team finisher and full-stacker
                            <br></br>
                        David Andberg -Scam master and an allround jester</p>
                    </form>
                </Container>
            </div>
        );
    }
}

const styles= {

    container:{
        position: 'relative',
        alignItems:'center',
        // display: 'flex',
    },
    form: {
        position: 'absolute',
        top: '15%',
        width: '100%',
        textAlign: 'center',
        fontSize: '3vw',
        opacity:1,
        maxHeight:'25%',
        maxWidth: '85%',
        paddingLeft: 25,
    },
    form2: {
        position: 'absolute',
        top: '15%',
        width: '100%',
        textAlign: 'center',
        fontSize:  '2vw',
        maxHeight:'25%',
        maxWidth: '85%',
        paddingLeft: 25,

    },
    form3: {
        position: 'absolute',
        top: '20%',
        width: '100%',
        textAlign: 'center',
        fontSize:  '2vw',
        maxHeight:'25%',
        maxWidth: '85%',
        paddingLeft: 25,

    },
    form4: {
        position: 'absolute',
        top: '10%',
        width: '100%',
        textAlign: 'center',
        fontSize:  '2vw',
        maxHeight:'25%',
        maxWidth: '85%',
        paddingLeft: 25,

    },
    backgrnd: {
        width: '100%',
        height: 'auto',
        opacity: '0.2',
        zIndex: -1,
    }
};


export default About;

