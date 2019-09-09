import React, {Component} from 'react';
import Jumbo from '../jumbo/Jumbo'
import TheOtherJumbo from "../jumbo/TheOtherJumbo";
import FooterPage from './FooterPage';


class Homer extends Component{
    render(){
        return(
            <div style={styles.jumbo}>
                <TheOtherJumbo/>
            </div>
        )
    }
}

export default Homer

const styles ={
    jumbo: {
        width: '100%',
        justify: 'center',
        alignItems: 'center',
        height: 'auto',
        marginTop: '10%',
        borderRadius: 'borderRadius',
    },
};
