import React, { useState, useContext } from 'react';
import { Button, DialogContentText, TextField } from "@material-ui/core";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { makeStyles } from "@material-ui/core/styles";
import socket from '../socket.io';
import ScreenGame from '../ScreenGame/screengame'
import { Context } from "../Constant/context";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(5),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

}));

function SettingRoom() {
    const classes = useStyles();
    const history = useHistory();
    const [value, setValue] = React.useState('0');
    const [name, setName] = useState('');
    const [time, setTime] = React.useState(20);
    const [open, setOpen] = React.useState(false);
    const [createroom, setCreateRoom] = useState("Tạo phòng");
    const [disabled, setDisabled] = useState(false);
    const [roomInfo, setRoomInfo] = useState(null);
    const [context, setContext] = useContext(Context);
    let temp = '0';

    socket.removeAllListeners();
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
    socket.on('joinroom-success', function (roomInfo) {
        socket.joinroom = true;
        // console.log(roomInfo);
        setRoomInfo(roomInfo);
    });
    socket.on('exist_room', (data) => {
        alert('Tên này đã có! vui lòng nhập tên khác!');
        setCreateRoom("Tạo phòng");
        setDisabled(false);
    })
   
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const handleChange_pass = (event) => {
        temp = event.target.value;
    };
    const handleChange_name = (event) => {
        setName(event.target.value);
    };
    const handleChange_time = (event) => {
        setTime(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const Textpass = () => {
        return (

            <TextField id="password" label="Mật khẩu" onChange={handleChange_pass} />
        )
    }
    const form_pass = (value === '0') ? <></> : <Textpass />


    const handleSubmit = () => {
        // setPassword=temp;
        setCreateRoom("...Đang chờ bạn của bạn vào phòng ...");
        setDisabled(true);
        const pass_room = temp;
        console.log("value ", value);
        console.log("pass_room ", pass_room);

        //---------------localstorage--------------------
        const name1 =localStorage.getItem('name');
        const _name=name1.slice(1, name1.length - 1);
        const id= localStorage.getItem('id');
        const _id=id.slice(1, id.length - 1);
          const room = {
            name: _name,
            id_room:name,
            id_player: _id,
            pass: pass_room,
            time: time
        }

        //----------------------------------------------




        // const room = {
        //     name: context.name,
        //     id_room: name,
        //     id_player: context.id,
        //     pass: pass_room,
        //     time: time
        // }

        socket.emit('createroom', room);
        socket.emit('tableonline');
    }
    if (roomInfo) {
        return <ScreenGame roomInfo={roomInfo} />
        //  return <Chat  />

    }
    else {


        return (
            <center>
                <div className={classes.paper}>
                    <Typography variant="h6" className={classes.title}>
                        Tạo phòng chơi mới
            </Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Tên phòng"
                        type="email"
                        onChange={handleChange_name}
                    />
                    <div className={classes.form}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Loại</FormLabel>
                            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                <FormControlLabel value="0" control={<Radio />} label="Công khai" />
                                <FormControlLabel value="1" control={<Radio />} label="Mật khẩu" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className={classes.form}>
                        {form_pass}
                    </div>
                    <div className={classes.form}>
                        <FormControl className={classes.formControl}>
                            <FormLabel component="legend">Thời gian một lượt đánh</FormLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={open}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                value={time}
                                onChange={handleChange_time}
                            >

                                <MenuItem value={10}>10 Giây</MenuItem>
                                <MenuItem value={15}>15 Giây</MenuItem>
                                <MenuItem value={20}>20 Giây</MenuItem>
                                <MenuItem value={25}>25 Giây</MenuItem>
                                <MenuItem value={30}>30 Giây</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className={classes.form}>
                        <Button color="primary" onClick={handleSubmit} disabled={disabled}>
                            {createroom}
                        </Button>
                      
                    </div>
                    <Button color="primary" onClick={handleBack} >
                            Hủy trận
                        </Button>

                </div>
            </center>
        );
    }
    function handleBack(){
      
        socket.emit('cancelroom',"1");
        history.push('/homepage');
    }
}



// If first time enter, this make sure not call a loop request









export default SettingRoom;
