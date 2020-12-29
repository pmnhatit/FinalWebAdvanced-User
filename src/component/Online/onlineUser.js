import React, { useEffect, useState,useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility'; 
import SendIcon from '@material-ui/icons/Send';
import socket from '../socket.io'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Context } from "../Constant/context";
import ItemUser from './itemonlineuser'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        // maxWidth: 752,
        justifyContent: 'space-between',
        // margin: 5,
        marginRight: 50,
        marginLeft:50
    },
    title: {
        margin: theme.spacing(2, 0, 2),
    },
    itemright: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    rowIcon:{

    }

}));

export default function OnlineUser() {
  const classes = useStyles();
  const [response, setResponse] = useState('');
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [context, setContext] = useContext(Context);
  
    
 
    // useEffect(() => {
      
      socket.off('onlineUserServer');
      socket.on('onlineUserServer', (arrayNameOnline) => {
          console.log("online ", arrayNameOnline);
       let temp=[];
        arrayNameOnline.forEach(element => {
  
          temp.push(element);

        });
  
        setOnlineUsers(temp);
  
        // const users = JSON.parse(message);
        // setOnlineUsers(users);
        // console.log(onlineUsers);
      });
      // return () => socket.disconnect();
    // }, []);
    const onlineUsersList = onlineUsers.map((onlineUser) => (
      <li>{onlineUser.name}</li>
    ));
    const handleInvite=()=>{
      console.log("click invite")
      const data={
        nameSend:context.name,
        id_player:context.id
      }
      socket.emit('request',data);
    }
    return (
        
        <div className={classes.root}>
            <Grid container spacing={2} className={classes.root}>
                <Grid item xs={12} >
                    <div className={classes.itemright}>
                        <Typography variant="h6" className={classes.title}>
                            Người chơi online
                    </Typography>
                    </div>
                    <div>
                    {onlineUsers.map((item) => (
                         <div className={classes.itemright}>
                     <ItemUser idsocket={item.id} name={item.name}
                     />
                    </div>
                    ))}
                    </div>
                </Grid>
             

            </Grid>
        </div>
    );
}



// If first time enter, this make sure not call a loop request










// import React, { useState, useEffect } from 'react';
// import socket from './socket.io';



// function App() {
//   const [response, setResponse] = useState('');
//   const [onlineUsers, setOnlineUsers] = useState([]);

//   useEffect(() => {
//     // const socket = socketIOClient(ENDPOINT);
//     socket.on('FromAPI', (data) => {
//       setResponse(data);
//     });
//     socket.on('onlineUserServer', (arrayNameOnline) => {
//         console.log("online ", arrayNameOnline);
//      let temp=[];
//       arrayNameOnline.forEach(element => {

//         temp.push(element.name);

//       });

//       setOnlineUsers(temp);

//       // const users = JSON.parse(message);
//       // setOnlineUsers(users);
//       // console.log(onlineUsers);
//     });
//     return () => socket.disconnect();
//   }, []);
//   const onlineUsersList = onlineUsers.map((onlineUser) => (
//     <li>{onlineUser}</li>
//   ));

//   return (
//     <div>
//       Danh sách người online
//       <ul>{onlineUsersList}</ul>
//     </div>
//   );
// }

// export default App;
