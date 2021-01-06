import React,{useState,useContext} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from "react-router-dom";
import { Context } from "../Constant/context";
import socket from '../socket.io'


export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [context, setContext] = useContext(Context);
  const history = useHistory();
  const [pass,setPass]= useState('');
  const handleClose = () => {
    props.closeDialog();
  };
  const handleChange=(e)=>{
      console.log(e.target.value);
      if(e.target.value===undefined)
    setPass('0');
    else{
        setPass(e.target.value);
    }
  }
  const handleJoin=()=>{
    
    setPass('');
    //====================localstrorage========================
    
    const name1=localStorage.getItem('name');
    const id =localStorage.getItem('id');
    const _name=name1.slice(1, name1.length - 1);
    const _id=id.slice(1, id.length - 1);
    const data={
        name: _name,
        id_player:_id,
        id_room: props.name,
        pass: pass
    }
    //=========================================================
    // const data={
    //     name: context.name,
    //     id_player:context.id,
    //     id_room: props.name,
    //     pass: pass
    // }
    console.log('request ',data);
    socket.emit('joinroom', data);
    socket.emit('tableonline');
    history.push('/homepage_game');
  }

  
  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Game caro</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Nhập mật khẩu
            (nếu không có mật khẩu vui lòng nhập 0 !!)
            
          </DialogContentText>
          <TextField
    
            margin="dense"
            id="Password"
            label="Password"
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Huỷ
          </Button>
          <Button onClick={handleJoin} color="primary">
            Tham gia phòng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
