import React, { useState, useEffect, useContext } from "react";
import queryString from 'query-string';
import socket from "../../socket.io";
import { InfoBar } from '../../Chatroom/InfoBar/infoBar';

import { Messages } from '../../Chatroom/Messages/messages';
import { TextContainer } from '../../Chatroom/TextContainer/TextContainer'
import { useParams } from 'react-router-dom';
import './chat.css';


// let socket;

export const Chat = (props) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);


  const ENDPOINT = 'http://localhost:5000/'
  useEffect(()=>{
    const chat=props.content;
    for(let i=0;i<chat.length;i++){
      setMessages(msgs => [...msgs, chat[i]]);
    }
  },[props.content])
 
  



  return (
    
    
      <div className="outerContainer">
        {/* <TextContainer users={users} /> */}
        <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
        
        </div>
      </div>
    

  );
}