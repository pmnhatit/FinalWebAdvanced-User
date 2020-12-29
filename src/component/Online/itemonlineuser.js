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
export default function ItemOnlineUser(props){
    const [context, setContext] = useContext(Context);
    const [disabled,setDisabled]=useState(false);
    const handleInvite=()=>{
        const data={
          nameSender:context.name,
          id_send:context.id,
          idsocket_receive:props.idsocket
        }
        socket.emit('request',data);
        setDisabled(true);
      }
      socket.off('timeout');
      socket.on("timeout",()=>{
        setDisabled(false);
    })
    return (
        <>
        <ListItemText 
        primary={props.name} />
        <IconButton >
          <VisibilityIcon />
        </IconButton>

      <IconButton onClick={handleInvite} disabled={disabled}>
        <SendIcon />
      </IconButton>
      </>
    )
}