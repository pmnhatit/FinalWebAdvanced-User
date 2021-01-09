import React ,{ useState, useEffect ,useContext} from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility'; 
import SendIcon from '@material-ui/icons/Send';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Context } from "../Constant/context";
import socket from '../socket.io'
import CancelRoom from '../Notification/cancelRoom'
export default function ItemOnlineUser(props){
    const [context, setContext] = useContext(Context);
    const [disabled,setDisabled]=useState(false);
    const [open, setOpen] = useState(false);
    const handleInvite=()=>{
      //------localstorage-------------------
      const name =localStorage.getItem('name');
      const _name=name.slice(1, name.length - 1);
      const id= localStorage.getItem('id');
      const _id=id.slice(1, id.length - 1);

      const data={
        name:_name,
        id_send: _id,
        idsocket_receive:props.idsocket,
        time:20
      }
      //-------------------------------

        // const data={
        //   nameSender:context.name,
        //   id_send:context.id,
        //   idsocket_receive:props.idsocket
        // }

        socket.emit('request',data);
        setDisabled(true);
      }
      function closeDialog(){
        setOpen(!open);
      }
      socket.off('timeout');
      socket.on("timeout",()=>{
        setOpen(true);
        setDisabled(false);
        //=======localdstorage==================
        const id= localStorage.getItem('id');
        const _id=id.slice(1, id.length - 1);
        const data={
          id:_id
        }
  
        //===================================
        // const data={
        //   id:context.id
        // }
        socket.emit('cancelroom',data);
    })
    return (
        <>
         <CancelRoom open={open} closeDialog={closeDialog}/>
        <ListItemText 
        primary={props.name} />
        

      <IconButton onClick={handleInvite} disabled={disabled}>
        <SendIcon />
      </IconButton>
      </>
    )
}