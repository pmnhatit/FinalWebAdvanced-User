import React, { useState, useEffect, useContext } from "react";
import queryString from 'query-string';
import socket from "../../socket.io";
import { InfoBar } from '../InfoBar/infoBar';
import { Input } from '../Input/input';
import { Messages } from '../Messages/messages';
import { TextContainer } from '../TextContainer/TextContainer'
import { Context } from "../../Constant/context";
import './chat.css';
import { PinDropSharp } from "@material-ui/icons";

// let socket;

export const Chat = (props) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [context, setContext] = useContext(Context);

  const ENDPOINT = 'http://localhost:5000/';
  // console.log(props.roomInfo);
  

  useEffect(() => {
    // const { name, room } = queryString.parse(location.search);

    // socket = io(ENDPOINT);
    
    setRoom(props.roomInfo.id);
    
    // ----------------------localstorage------------------------------------
    setName(localStorage.getItem('name'));
    socket.emit('join_chat', { name: localStorage.getItem('name'), room: props.roomInfo.id }, (error) => {
      if (error) {
        alert(error);
      }
    });
    //----------------------------------------------------------------------------
    // setName(context.name);
    // socket.emit('join_chat', { name: context.name, room: props.roomInfo.id }, (error) => {
    //   if (error) {
    //     alert(error);
    //   }
    // });
  }, []);
  //   }, [ENDPOINT, location.search]);

   socket.off('message');
  socket.on('message', message => {
    setMessages(msgs => [...msgs, message]);
  });

  socket.on("roomData", ({ users }) => {
    setUsers(users);
  });


  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }
  return (
    <div>
      <div style={{ backgroundColor: "black" }}>

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