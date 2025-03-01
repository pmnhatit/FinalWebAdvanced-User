import React,{useContext} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import socket from '../socket.io';
import { useHistory } from "react-router-dom";
import { Context } from '../Constant/context';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(false);
  const [context, setContext] = useContext(Context);
  const history = useHistory();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    const data1={
      id:props.idsender
    }
    socket.emit('cancelroom',data1);
    console.log("da tu choi");
    // socket.on('timeout',()=>{
    //   const data={
    //     id:props.id_sender
    //   }
    //   socket.emit('cancelroom',data);
    // });
    props.closeDialog();
  };
  const handleAgree=()=>{
    //------------localstorage--------------

    const name1=localStorage.getItem('name');
    const _name=name1.slice(1, name1.length - 1);
    const id=localStorage.getItem('id');
    const _id=id.slice(1, id.length - 1);
    const data={
      id_sender:props.idsender,
      name_sender:props.sender,
      name:_name,
      id_player:_id,
      pass:props.idsender,
      idsocket_sender:props.idsocket_sender
    }
    
    //-----------------------------------


    // const data={
    //   id_sender:props.idsender,
    //   name_sender:props.sender,
    //   name:context.name,
    //   id_player:context.id,
    //   pass:props.idsender,
    //   idsocket_sender:props.idsocket_sender

    // }
   
    socket.emit('accept',data);
    socket.emit('tableonline');
    props.closeDialog();
    history.push('/homepage_game')
  }
  const handleDisagree=()=>{
    const data1={
      id:props.idsender
    }
    socket.emit('cancelroom',data1);
    console.log("da tu choi");
    // socket.on('timeout',()=>{
    //   const data={
    //     id:props.id_sender
    //   }
    //   socket.emit('cancelroom',data);
    // });
    props.closeDialog();
  }

  return (
    <div>
      <Dialog
       open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Game caro"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props.sender} mời bạn chơi game
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree} color="primary">
            Disagree
          </Button>
          <Button onClick={handleAgree} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
