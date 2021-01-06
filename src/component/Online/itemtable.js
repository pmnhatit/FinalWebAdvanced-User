import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ListItemText from '@material-ui/core/ListItemText';

import IconButton from '@material-ui/core/IconButton';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import JoinRoom from '../Notification/joinroom'
const useStyles = makeStyles((theme) => ({

    item: {
        display:'flex',
        flexDirection:'row'
    },
    
    title: {
        margin: theme.spacing(4, 0, 2),
    },
}));


export default function ItemTable(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    function closeDialog(){
        setOpen(!open);
      }
    const handleJoinRoom=()=>{
        setOpen(true);
    }
  return (
    <>
    <div className={classes.item}>
    <JoinRoom open={open} closeDialog={closeDialog} name={props.name} />
      <ListItemText
        primary={props.name} />
      
        <IconButton onClick={handleJoinRoom} >
          <MeetingRoomIcon/>
        </IconButton>
    
      
      </div>
    </>
  )

}