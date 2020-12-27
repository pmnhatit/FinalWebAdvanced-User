import React, { useState,useContext } from 'react';
import {Button,TextField} from "@material-ui/core";
import ScreenGame from '../ScreenGame/screengame'
import {Chat} from '../Chatroom/Chat/chat'
import socket from '../socket.io'
import {Link} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Context } from "../Constant/context";
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(5),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    margin_top: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

}));
function Homepage() {
    const classes = useStyles();
    const [rival,setRival]=useState("Chơi nhanh");
    const [friend,setFriend]=useState("vao phong");
    const [roomInfo, setRoomInfo] = useState(null);
    const [idRoom,setIDRoom]=useState(0);
    const [pass,setPass]=useState('0');
    const [disabled,setDisabled]=useState(false);
    const [context, setContext] = useContext(Context);

    socket.removeAllListeners();
    socket.on('joinroom-success', function (roomInfo) {
        socket.joinroom = true;
        console.log(roomInfo);
        setRoomInfo(roomInfo);
    });
    socket.on('no-room',(data)=>{
        alert("Không tìm thấy phòng");
    })
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
           
               
                <div className={classes.paper} >
                    <Button variant="contained" onClick={(e)=>findRival(e)} disabled={disabled}>{rival}</Button>
                    <Link to={`/settingroom`}>
                        <div className={classes.margin_top}>
                    <Button >
                        Tạo phòng
                    </Button>
                    </div>
                    </Link>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Tên phòng"
                        type="email"
                        onChange={handleChange} 

                    />
                    <TextField

                        margin="dense"
                        id="pass"
                        label="Mật khẩu (nếu có)"
                        type="email"
                        onChange={handleChange} 

                    />
                     <Button onClick={handleSubmit}>
                        Tham gia phòng
                    </Button>
                   
                   
                </div>
          
        );
    }
    function findRival(e) {
        setRival(".... Đang tìm đối thủ ....")
        setDisabled(true);
        const data={
            name: context.name,
            id: context.id,
            pass: '0',
            time: 10
        }
        socket.emit('joinroom_quick', data);
        socket.emit('tableonline');
    }
    function handleChange(event) {
        if(event.target.id==='name')
        setIDRoom(event.target.value);
        else{
            setPass(event.target.value);
        }
    }
    function handleSubmit(e){
        console.log("name ",idRoom);
        console.log("pass ",pass);
        const data={
            name: context.name,
            id: idRoom,
            pass: pass,
            time: 10
        }
        console.log(data);
        socket.emit('joinroom', data);
        socket.emit('tableonline');
    }
}

// If first time enter, this make sure not call a loop request









export default Homepage;
