import React, {Component} from 'react';
import AwesomeSlider from "react-awesome-slider";
import 'react-awesome-slider/dist/styles.css';
import styles from './style.scss';
/*
josh-felise-VrtbeywxXDw-unsplash.jpg
kurt-cotoaga-cqbLg3lZEpk-unsplash.jpg
kyle-cesmat-5wZ3iImG-I4-unsplash.jpg
tomas-malik-MODPxoyttL8-unsplash.jpg
*/
class TheOtherJumbo extends Component {

    render() {

        return (
            <div styles={style.SliderContainerStyle}>

                <AwesomeSlider cssModule={styles}>
                    <div style={style.pic} data-src="/pics/josh-felise-VrtbeywxXDw-unsplash.jpg">
                        <div style={style.textwrap}>
                        <p style={style.text}>
                            Hi photographer!
                            <br></br>
                            <br></br>
                            Ever had problems with planning your shoots, keeping all your thoughts together and getting the idea through with all your collaborators?
                            <br></br>
                            <br></br>
                            This App is made for you.
                            <br></br>
                        </p>
                        </div>
                    </div>
                    <div style={style.pic}  data-src="/pics/kurt-cotoaga-cqbLg3lZEpk-unsplash.jpg">
                        <div style={style.textwrap}>
                            <p  style={style.text}>
                                Our goal is to make things easier for you.
                                You will be able to keep track of your upcoming photoshoots and manage the planning in one place.
                                <br></br>
                                <br></br>
                                This platform is made for photographers to help and pace up the planning process.
                            </p>
                        </div>
                    </div>
                    <div style={style.pic}  data-src="/pics/kyle-cesmat-5wZ3iImG-I4-unsplash.jpg">
                        <div style={style.textwrap}>
                            <p  style={style.text}>
                                Don't we all just love the small beautiful things in life?
                                <br></br>
                                Sign up and start your journey! <a style={{color:'black'}} href="http://localhost:3000"> sign up</a>
                            </p>
                        </div>
                    </div>
                    <div style={style.pic}  data-src="/pics/tomas-malik-MODPxoyttL8-unsplash.jpg">
                        <div style={style.textwrap}>
                        <p  style={style.lasttext}>
                            On the map page you can pinpoint the location you had in your for the photoshoot and check from which direction the sun shines.
                            <br></br>
                            <br></br>
                            You are also able to attach some referencephotos to your plan, add the location on map
                            and make notes concerning your vision.</p>
                        </div>
                    </div>
                </AwesomeSlider>
            </div>

        );
    }
}

export default TheOtherJumbo;



const style= {
    SliderContainerStyle: {
        marginBottom: '30px',
    },
    textwrap: {
        textAlign:'center',

    },
    text: {
        fontSize:'2.5vw',
        position: 'absolute',
        left: '5%',
        top: '45%',
        width: '90%',
        textAlign: 'center',
        color: 'white',
        textShadow: '10px 10px 30px grey',
    },
    lasttext:{
        fontSize:'2.5vw',
        position: 'absolute',
        left: '5%',
        top: '55%',
        width: '90%',
        textAlign: 'center',
        color: 'ghostwhite',
        textShadow: ' 0 0 3px black, 10px 10px 30px black',
    },
    pic:{
        position: 'relative',
    },

};
