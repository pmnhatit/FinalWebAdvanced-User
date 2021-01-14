import React, { useState, useContext,useEffect } from 'react';

import '../../index.css';
import Board from './Board'
import checkWin from './services'
import Config from '../Constant/configs'
import socket from '../socket.io'
import { Button,Avatar } from "@material-ui/core";
import { Context } from "../Constant/context";
import Check from '@material-ui/icons/DoneOutline';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Reconcile from '../Notification/reconcile'
import ReconcileButton from '../Notification/reconcile_button'
import ReconcileButtonView from '../Notification/reconcile_button_view'
import {Link} from "react-router-dom";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { useHistory } from "react-router-dom";
import Disagree from '../Notification/reconcile_disagree'
import Surrender from '../Notification/surrender'
import SurrenderViewer from '../Notification/surrender_view'
import Winner from '../Notification/winner'
import WinnerViewer from '../Notification/winner_view'
import {Chat} from '../Chatroom/Chat/chat'

const useStyles = makeStyles((theme) => ({

    item: {
        display: 'flex',
        flexDirection: 'row',
        marginTop:10
    },
    margin_top:{
        marginTop:20
    },
    large: {
        width: theme.spacing(6),
        height: theme.spacing(6),
      },


}));

function Game(props) {
    const classes = useStyles();
    const history_router = useHistory();
    const [context, setContext] = useContext(Context);
    const [history, setHistory] = useState([
        {
            squares: Array(Config.brdSize * Config.brdSize).fill(null)
        }
    ]);
    const [winner, setWinner] = useState(null);
    const [nextMove, setNextMove] = useState(true);
    const [winCells, setWinCell] = useState(null);
    const [stepNumber, setstepNumber] = useState(0);
    const [accendingMode, setAccending] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [checkX, setCheckX] = useState(<></>);
    const [checkO, setCheckO] = useState(<></>);
    const [readyX, setReadyX] = useState(false);
    const [readyO, setReadyO] = useState(false);
    const [moveHistory, setMoveHistory] = useState([]);
    const [open,setOpen]=useState(false);
    const [openButton,setOpenButton]=useState(false);
    const [openDisagree,setOpenDisagree]=useState(false);
    const [openSurrender,setOpenSurrender]=useState(false);
    const [openWinner,setOpenWinner]=useState(false);
    const [contentDialog,setContentDialog]=useState('abc');
    const [disabled_button,setDisabledButton]=useState(true);
    const [test,setTest]=useState(0);
    const [time,setTime]=useState(0);

    const [avtX,setAvtX]=useState('');
    const [avtO,setAvtO]=useState('');
    const url = localStorage.getItem("backend");
    const user= JSON.parse(localStorage.getItem('user'));
    const token=JSON.parse(localStorage.getItem('token'));
    
    useEffect(() => {
       
        const res =  fetch(url+`profile/${props.roomInfo.idplayerX}`, {
          method: "GET",
          mode: "cors",
          headers: {
             Authorization:'Bearer '+ `${token}`,
             'Content-Type': 'application/json',
        },
          // body: JSON.stringify(body),
        })
          .then((res) => res.json())
          .then((result) => {
            setAvtX(result.image);
            
          })
          .catch((err) => {
           
          });
          const res2 =  fetch(url+`profile/${props.roomInfo.idplayerO}`, {
            method: "GET",
            mode: "cors",
            headers: {
               Authorization:'Bearer '+ `${token}`,
               'Content-Type': 'application/json',
          },
            // body: JSON.stringify(body),
          })
            .then((res) => res.json())
            .then((result) => {
                console.log("result ",result);
                setAvtO(result.image)
              
            })
            .catch((err) => {
             
            });
        }, [])


    function closeDialog(){
        setOpen(!open);
      }
      function closeDialogWinner(){
        setOpenWinner(!openWinner);
      }
      function closeDialogButton(){
        setOpenButton(!openButton);
      }
      function closeDialogDisagree(){
        setOpenDisagree(!openDisagree);
      }
      function closeDialogSurrender(){
        setOpenSurrender(!openSurrender);
      }
    // setupSocket();
    socket.off('move');
    socket.on('move', function (data) {
        handleClick(data.i);
    });
    socket.off('readyX');
    socket.on('readyX', (data) => {
        console.log("reay dkmksd" ,data);
        console.log('loi roi');
        setCheckX(
            <IconButton color="primary">
                <Check />
            </IconButton>)
        setReadyX(true);
    })
    socket.off('readyO');
    socket.on('readyO', (data) => {
        console.log("reayO dkmksd" ,data);
        setCheckO(
            <IconButton color="primary">
                <Check />
            </IconButton>)
        setReadyO(true);
    })
    socket.off('disconnected');
    socket.on('disconnected', (data) => {
        console.log("disconnect ", data);

        if (data.playerO === "DISCONNECTED") {
            setReadyO(false);
            setCheckO("   DISCONNECTED");
        }
        if (data.playerX === "DISCONNECTED") {
            setReadyX(false);
            setCheckX("  DISCONNECTED");
        }
    })
    socket.off('re_reconnect');
    socket.on('loadhistory',(data)=>{
         setMoveHistory(data);
    })
    socket.on('re_reconnect', (data) => {
        console.log("histoty ", data);
        setMoveHistory(data);
        if (data.length % 2 === 0) {
            console.log('chia het cho 2');
            setNextMove(true);
        }
        else {
            setNextMove(false);
        }

        setReadyO(true);
        setReadyX(true);
        setDisabled(true);
        setCheckX(<IconButton color="primary">
            <Check />
        </IconButton>);
        setCheckO(<IconButton color="primary">
            <Check />
        </IconButton>)
    })
    socket.on('reconcile_agree',(data)=>{
        setOpenButton(true);
        setContentDialog(`Trận đấy kêt thúc.Do ${data} xin hoà`);
        socket.emit('remove_time',props.roomInfo);

    })
    socket.on('reconcile_disagree',()=>{
        setOpenDisagree(true);
        socket.emit('remove_time',props.roomInfo);
      
    })
    socket.on('reconcile',()=>{
        setContentDialog('Đối thủ muốn xin hòa')
        setOpen(true);
       
    })
    socket.on('surrender',(name)=>{
        setOpenSurrender(true);
        setContentDialog(`${name} đầu hàng`);
    })
    socket.off('outroom');
    socket.on('outroom',()=>{
        history_router.push('/homepage');
    })
    socket.off('time');
    socket.on('time',(time)=>{
        setTime(time);
    })
    socket.off('timing_out');
    socket.on('timing_out',(name)=>{
      
        setOpenSurrender(true);
        setContentDialog(`${name} thua do hết thời gian .Trận đấu kết thúc`);
    })
    socket.off('infoWinnerNotification');
    socket.on('infoWinnerNotification',(name)=>{
        setOpenWinner(true);
        setContentDialog(`${name} đã chiến thắng`)
    })

    
      
   
    const time_show_X=nextMove? <> thời gian {time}</>:<></>
    const time_show_O=nextMove?<></>:<> thời gian {time}</>
    console.log("roomInfo ",props.roomInfo);
    const handleClick = (i) => {
        const history2 = history.slice(0, stepNumber + 1);

        const current = history2[history2.length - 1];

        const squares = current.squares.slice();
        if (winCells === null && squares[i] === null) {
            squares[i] = nextMove ? "X" : "O";


            setHistory(history2.concat([
                {
                    squares: squares,
                    latestMoveSquare: i
                }
            ]));
            const _history = history2.concat([
                {
                    squares: squares,
                    latestMoveSquare: i
                }
            ])
            const XorO = nextMove ? "X" : "O";

            const _winCells = checkWin(i, XorO, history2.length - 1, _history);
            setstepNumber(history2.length);
            setNextMove(!nextMove);
            setWinCell(_winCells.winCells);
            setWinner(_winCells.user);
        }
    }

    for (let i = moveHistory.length - 1; i >= 0; i--) {
        handleClick(moveHistory[i]);
    }
    // const disable=(winner==null)? true: false;
    if(winner!=null)
    {
        if(test===0){
            const data = {
                roomInfo: props.roomInfo.id,
                winner: winner
            }
            const roomInfo=props.roomInfo;
            socket.emit("infoWinnerNotification", {data,roomInfo});
            setTest(1);
        }
    }


    //-----------localstorage----------------------
    const ourname=localStorage.getItem('name');
    const name= ourname.slice(1, ourname.length - 1);
    const room = props.roomInfo.playerX;
    let isPlayerX = name === room; 
    const ourname0=localStorage.getItem('name');
    const nameO=ourname0.slice(1,ourname0.length-1);
    console.log('name0 ',nameO);
    const roomO=props.roomInfo.playerO;
    console.log(props.roomInfo);
    console.log('roomO ',roomO);
    let isPlayerO=nameO===roomO;
    console.log('isplayerO ', isPlayerO);
    // ---------------------------------------------


    // const ourname = context.name;
    // const room = props.roomInfo.playerX;
    // var isPlayerX = ourname === room;

    // const nameO = context.name;
    // const roomO = props.roomInfo.playerO;

    // var isPlayerO = nameO === roomO;

    function userClick(i) {
       
        if ((isPlayerX && !nextMove) || (!isPlayerX && nextMove)) {
            return;
        }
        if (readyX && readyO) {
            console.log("qua cong")
            if (((isPlayerX && nextMove) || (isPlayerO && !nextMove))) {
                handleClick(i);
                const data = {
                    i,
                    nextMove: nextMove
                }
                socket.emit('move', data);
            }
        }

        // Send move to server if it is valid


    }

   
    const handleSortToggle = () => {
        setAccending(!accendingMode);
    }
    const current = history[stepNumber];
    

    return (
        (isPlayerX||isPlayerO)?(
        <div className="game">
           <Winner open={openWinner} closeDialog={closeDialogWinner} name ={contentDialog} roomInfo={props.roomInfo}
            isPlayerX={isPlayerX} winner={winner}/>
            <Surrender open={openSurrender}  closeDialog={closeDialogSurrender} name={contentDialog}/>
            <Disagree open={openDisagree}  closeDialog={closeDialogDisagree}/>
          <Reconcile open={open} closeDialog={closeDialog} name={contentDialog} roomInfo={props.roomInfo}/>
          <ReconcileButton open={openButton} closeDialog={closeDialogButton} name={contentDialog}/>
            {/* <Button onClick={(e) => handleSubmitHistory(e)} color="primary" disabled={disable}>
                Luu lai
            </Button> */}
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={i => userClick(i)}
                    winLine={winCells}
                />
            </div>
            
            <div className="game-info">       
            <div >
                Ten phong: {props.roomInfo.id}
              
            </div>
            <div className={classes.margin_top}>
                Pass:{props.roomInfo.pass}
              
            </div>       
                <div className={classes.margin_top} >
                <Avatar  src={avtX} className={classes.large} />
                    playerX: {props.roomInfo.playerX}
                    {checkX}
                    {time_show_X}
                </div>
                <div>
                <Avatar  src={avtO} className={classes.large} />
                    playerO: {props.roomInfo.playerO}
                    {checkO}
                    {time_show_O}
                </div>
                
                <Button variant="contained" color="secondary" onClick={handleReady} disabled={disabled}>
                    Ready
                </Button>
                <div className={classes.item}>
                    <Button variant="outlined" color="primary" onClick={handleReconcile}>
                        Xin Hoà
                    </Button>
                    <Button variant="outlined" onClick={handleSurrender}>Đầu hàng</Button>
                    
                     
                </div>
                <div>
                <Chat roomInfo={props.roomInfo}/>
                </div>
            </div>
        </div>
        )
        :(
            <div className="game">
               <WinnerViewer open={openWinner} closeDialog={closeDialogWinner} name ={contentDialog} />
             <SurrenderViewer open={openSurrender}  closeDialog={closeDialogSurrender} name={contentDialog}/>
          
            {/* <Disagree open={openDisagree}  closeDialog={closeDialogDisagree}/>
          <Reconcile open={open} closeDialog={closeDialog} name={contentDialog}/> */}
          <ReconcileButtonView open={openButton} closeDialog={closeDialogButton} name={contentDialog}/>
            {/* <Button onClick={(e) => handleSubmitHistory(e)} color="primary" disabled={disable}>
                Luu lai
            </Button> */}
            <div className="game-board">
                <Board

                    squares={current.squares}
                    onClick={i => userClick(i)}
                    winLine={winCells}
                />
            </div>

            <div className="game-info">
                {/* <div>{status}</div>

                <button onClick={() => handleSortToggle()}>
                    {accendingMode ? 'descending' : 'ascending'}
                </button>
                <ol>{moves}</ol> */}
              
                <div>

                    playerX: {props.roomInfo.playerX}
                    {checkX}

                </div>
                <div>
                    playerO: {props.roomInfo.playerO}
                    {checkO}
                </div>
                <div className={classes.item}>
                <Button variant="outlined" color="primary" onClick={handleOutRoom}>
                    Thoát trận
                </Button>
            </div>
            <div>
                <Chat roomInfo={props.roomInfo}/>
                </div>
            </div>
        </div>
        )
    );
    function handleOutRoom(){
        history_router.push('/homepage');
    }
    function handleReconcile(){
        if(isPlayerO)
        {
            const data={
                rival:props.roomInfo.idplayerX
            }
        }
        socket.emit('reconcile');
    }
    function handleSurrender(){
        socket.emit('remove_time',props.roomInfo);
        if(isPlayerX){
            const data={
                id_winner:props.roomInfo.idplayerO,
                id_loser:props.roomInfo.idplayerX
            }
         
          
            socket.emit('surrender',data);
        }
        if(isPlayerO){
            const data={
                id_winner:props.roomInfo.idplayerX,
                id_loser:props.roomInfo.idplayerO
            }
           
            socket.emit('surrender',data);
        }
       

    }
    function handleReady() {
        setDisabled(true);
        //========localstorage=======================
        const name=localStorage.getItem('name');
        const _name=name.slice(1, name.length - 1);
        const data={
            name:_name,
            idroom:props.roomInfo.id
        }
        //==============================================
        // const data = {
        //     name: context.name,
        //     idroom: props.roomInfo.id
        // }
        console.log("ready ",data);
        socket.emit('ready', data);

    }
    function handleSubmitHistory(e) {
        console.log(winner);
        const data = {
            roomInfo: props.roomInfo.id,
            winner: winner
        }
        socket.emit("infoWinner", data);
    }
}
function convert(i) {
    const col = 1 + i % Config.brdSize;
    const row = 1 + Math.floor(i / Config.brdSize);
    return { col, row }
}

export default Game;
