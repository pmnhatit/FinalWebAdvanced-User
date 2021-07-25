import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import OnlineUser from '../Online/onlineUser' ;

import TableOnline from '../Online/tableonline'
import {Button,colors,TextField} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import {useParams} from "react-router-dom";
import socket from '../socket.io'
import Invite from '../Notification/inviteNotification'


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
     const history = useHistory();
    const classes = useStyles();
    const [addwell,setWell]=useState(false);
    const [addimprove,setImprove]=useState(false);
    const [addaction,setAction]=useState(false);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [sender,setSender]=useState('');
    const [idSender,setIdSender]=useState('');
    const [idsocket_sender,setIdsocketSender]=useState('');

   
    const name1 =localStorage.getItem('name');
    const _name=name1.slice(1, name1.length - 1);
    const id= localStorage.getItem('id');
    const _id=id.slice(1, id.length - 1);
    const data={
      name:_name,
      id_player:_id
    }
    console.log("data",data)
    socket.emit('onlineUser',data);
    // var socket = io.connect();

    function closeDialog(){
        setOpen(!open);
      }
      function closeDialog1(){
        setOpen1(!open1);
      }
      
      
      socket.on('invite',(data)=>{
        setSender(data.name);
        setIdSender(data.idsender); 
        setIdsocketSender(data.idsocket_sender);
        setOpen(true);
       
       
    })
    socket.on('already',()=>{
        history.push('/homepage_game');
    })
    const handeClick=()=>{
        history.push('/homepage_game');
    }
    return (
        <div className={classes.root}>
             <Invite open={open} closeDialog={closeDialog} sender={sender} 
             idsender={idSender} idsocket_sender={idsocket_sender}/>
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
                    <Button variant="contained" color="secondary" onClick={handeClick}>
                        Chơi game
                    </Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
