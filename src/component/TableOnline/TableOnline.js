import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import socket from '../socket.io'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';
// import EditIcon from '@material-ui/icons/Edit';


import { useParams } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        // maxWidth: 752,
        justifyContent: 'space-between',
        margin: 5,
        marginRight: 30
    },
    title: {
        margin: theme.spacing(2, 0, 2),
    },
    itemright: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between'

    },

}));

export default function InteractiveList(props) {
    const classes = useStyles();
    const [listPlay, setListPlay] = useState([]);
    const [listWait, setListWait] = useState([]);

    useEffect(() => {
        socket.on('tableonline_play', (tableonline) => {
            setListPlay(tableonline);
        });
        socket.on('tableonline_wait', (tableonline) => {
            setListWait(tableonline);

        });
        return () => socket.disconnect();

    }, []);
    return (
        
        <div className={classes.root}>
            <Grid container spacing={2} className={classes.root}>
                <Grid item xs={6} >
                    <div className={classes.itemright}>
                        <Typography variant="h6" className={classes.title}>
                            Danh sách bàn đang chơi
                    </Typography>
                    </div>
                    <div>
                    {listPlay.map((item) => (
                        <>
                      <ListItemText
                      primary={item} />
                      {/* <IconButton >
                        <EditIcon />
                      </IconButton>
              
                    <IconButton >
                      <DeleteIcon />
                    </IconButton> */}
                    </>
                    ))}
                    </div>
                </Grid>
                <Grid item xs={6} >
                    <div className={classes.itemright}>
                        <Typography variant="h6" className={classes.title}>
                            Danh sách bàn đang chờ
                    </Typography>

                    </div>
                    <div >
                    {listWait.map((item) => (
                        <>
                      <ListItemText
                      primary={item} />
                      {/* <IconButton >
                        <EditIcon />
                      </IconButton>
              
                    <IconButton >
                      <DeleteIcon />
                    </IconButton> */}
                    </>
                    ))}
                    </div>
                </Grid>

            </Grid>
        </div>
    );
}
