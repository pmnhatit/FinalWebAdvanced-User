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
    props.closeDialog();
   
  };
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
           {props.name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        
        
        </DialogActions>
      </Dialog>
    </div>
  );
}
