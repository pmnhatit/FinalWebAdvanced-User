import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import socket from '../../socket.io'


import {InfoBar} from '../InfoBar/infoBar';
import {Input} from '../Input/input';
import {Messages} from '../Messages/messages';
import {TextContainer} from '../TextContainer/TextContainer'

import './chat.css';
import { CodeSharp } from "@material-ui/icons";



export const Chat = (props) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  // const ENDPOINT = 'http://localhost:3000/';


  useEffect(() => {
    
    
    setRoom(props.roomInfo.id);
    setName(JSON.stringify(localStorage.getItem('name')));
   console.log("room" ,props.roomInfo.id);
   console.log("name", localStorage.getItem('name'));
    socket.emit('join_chat', { name:localStorage.getItem('name'), room:props.roomInfo.id }, (error) => {
      if(error) {
        alert(error);
      }
    });
}, []);
 
  
  useEffect(() => {
   
    socket.on('message', message => {
      console.log("message ",message)
      setMessages(msgs => [ ...msgs, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }
 

  return (
    <div>
      <div style={{backgroundColor: "black"}}>

      </div>
      <div className="outerContainer">
    {/* <TextContainer users={users} /> */}
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
    </div>
    
  );
}