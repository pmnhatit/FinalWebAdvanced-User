import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import socket from '../socket.io'
import ListItemText from '@material-ui/core/ListItemText';
import ItemTable from '../Online//itemtable'


const useStyles = makeStyles((theme) => ({

    itemListWell: {
        backgroundColor: '#26a69a',
        marginTop: 5
    },
    
    title: {
        margin: theme.spacing(4, 0, 2),
    },
}));
function ItemPlay(props) {
    const classes = useStyles();
    const [items,setItems]=useState([]);
    useEffect(() => {
       
        socket.emit('tableonline');
      
      
        // return () => socket.disconnect();

    }, []);
    // socket.off('tableonline_play');
    socket.off('tableonline_play');
    // socket.on('tableonline_play', (tableonline) => {
    //     setItems(tableonline);
    // });
    socket.on('tableonline_play', (tableonline) => {
        setItems(tableonline);

    });
        return (
            <>
                <List >
                    {items.map((item) => (
                        
                        <ItemTable name={item}/>
                    ))}

                </List>
            </>

        );
    
    // const [dense, setDense] = React.useState(false);

}
export default ItemPlay;