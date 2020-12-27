import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import OnlineUser from '../onlineUser' ;
import Homepage_game from './homepage_game'
import TableOnline from '../TableOnline/tableonline'
import {Button,colors,TextField} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import {useParams} from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        // maxWidth: 752,
        justifyContent: 'space-between',
        margin: 5,
        marginRight: 30
    },
    title: {
        marginTop: theme.spacing(5),
    },
    itemright:{
       display:"flex",
       flexDirection:'row',
       justifyContent:'space-between'
       
    },
    
}));

export default function InteractiveList(props) {
    const classes = useStyles();
    const [addwell,setWell]=useState(false);
    const [addimprove,setImprove]=useState(false);
    const [addaction,setAction]=useState(false);
    let { id } = useParams(); 
    const history = useHistory();
    const handeClick=()=>{
        history.push('/game');
    }
    return (
        <div className={classes.root}>
            <Grid container spacing={2} className={classes.root}>
                <Grid item xs={4} >
                    <div>
                        <OnlineUser/>
                    </div>
                </Grid>
                <Grid item xs={6} >
               
                    <div >
                        <TableOnline/>
                    </div>
                </Grid>
                <Grid item xs={2} >
                    <div className={classes.title} >
                    <Button onClick={handeClick}>
                        Chơi game
                    </Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
