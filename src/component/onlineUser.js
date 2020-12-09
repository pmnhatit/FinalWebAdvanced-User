import React, { useState, useEffect } from 'react';
import socket from './socket.io';



function App() {
  const [response, setResponse] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    // const socket = socketIOClient(ENDPOINT);
    socket.on('FromAPI', (data) => {
      setResponse(data);
    });
    socket.on('onlineUserServer', (arrayNameOnline) => {
        console.log("online ", arrayNameOnline);
     let temp=[];
      arrayNameOnline.forEach(element => {

        temp.push(element.name);
        
      });
     
      setOnlineUsers(temp);
     
      // const users = JSON.parse(message);
      // setOnlineUsers(users);
      // console.log(onlineUsers);
    });
    return () => socket.disconnect();
  }, []);
  const onlineUsersList = onlineUsers.map((onlineUser) => (
    <li>{onlineUser}</li>
  ));

  return (
    <div>
      Danh sách người online
      <ul>{onlineUsersList}</ul>
    </div>
  );
}

export default App;
