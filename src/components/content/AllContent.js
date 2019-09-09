import React, {useContext, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Consumer as AuthConsumer, Provider, AuthContext } from '../context/Authcontext'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        overflow: 'auto',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'wrap',
        width: "100%",
        height: "100%",
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    titleBar: {
        background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
        color: 'white',
    },
    img: {
        filter: "grayscale(1)",
        '&:hover': {
            filter: "grayscale(0)",
            border: "2px solid gray"
        }
    },
    
}));

export default function AdvancedGridList() {
    const classes = useStyles();
    const auth = useContext(AuthContext)
    const [tileData, setTiledata] = useState([])
    useEffect(() => {
        const data = auth.getData("content")
            
            .then(res => setTiledata(res))
        
    }, tileData )
    console.log(tileData)
    return ( tileData.length ?
        <div className={classes.root}>
            <GridList cellHeight={400} spacing={1} className={classes.gridList}>
                {tileData.map(tile => (
                   
                    <GridListTile key={tile.image.url} cols={tile.featured ? 1 : 1} rows={tile.featured ? 1 : 1}>
                        <img src={`/pictures/${tile.image.url}`} alt={tile.message} className={classes.img} />
                        <GridListTileBar
                            title={tile.message}
                            subtitle={<span>by: {tile.creator.username}</span>}
                            titlePosition="top"
                            actionIcon={
                                <IconButton aria-label={`star ${tile.message}`} className={classes.icon}>
                                    <StarBorderIcon />
                                </IconButton>
                            }
                            actionPosition="left"
                            className={classes.titleBar}
                        />
                        </GridListTile>
                
                ))}
            </GridList>
        </div> : <div></div>
    );
}

