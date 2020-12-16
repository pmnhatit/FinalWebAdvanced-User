import React, { useState } from 'react';
import {Button,TextField} from "@material-ui/core";
import ScreenGame from '../ScreenGame/screengame'
import {Chat} from '../Chatroom/Chat/chat'
import socket from '../socket.io'

function Homepage() {
    const [rival,setRival]=useState("tim doi thu");
    const [friend,setFriend]=useState("vao phong");
    const [roomInfo, setRoomInfo] = useState(null);
    const [idRoom,setIDRoom]=useState(0);


    socket.removeAllListeners();
    socket.on('joinroom-success', function (roomInfo) {
        socket.joinroom = true;
        // console.log(roomInfo);
        setRoomInfo(roomInfo);
    });
    // socket.on('joinroom-success-ai', function (roomInfo) {
    //     socket.joinroom = true;
    //     actions.actionJoinRoom(roomInfo);
    //     actions.actionResetGame(Config.oPlayer);
    // });

    // If found a rival, start game
    if (roomInfo) {
         return <ScreenGame roomInfo={roomInfo} />
        //  return <Chat  />
       
    }
    // Choose to play with AI or other user
    else {
        return (
            <center>
               
                <div >
                    <Button variant="contained" onClick={(e)=>findRival(e)}>{rival}</Button>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        onChange={handleChange} fullWidth

                    />
                     <Button onClick={(e)=>handleSubmit(e)} color="primary">
                        {friend}
                    </Button>
                   
                </div>
            </center>
        );
    }
    function findRival(e) {
        setRival(".... Dang tim doi thu ....")
        e.target.disabled = true;
        const data={
            name:JSON.parse(localStorage.getItem('name')),
            id: JSON.parse(localStorage.getItem('id'))
        }
        socket.emit('joinroom', data);
    }
    function handleChange(event) {
        setIDRoom(event.target.value);
    }
    function handleSubmit(e){
        setFriend(".... Cho ban ....");
        e.target.disabled=true;
        const data={
            name:JSON.parse(localStorage.getItem('name')),
            id :idRoom
        }
        socket.emit('joinroom_friend',data );
    }
}

// If first time enter, this make sure not call a loop request









export default Homepage;
