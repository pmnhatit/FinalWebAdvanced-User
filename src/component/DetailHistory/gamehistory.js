import React, { useState, useContext, useEffect } from 'react';

import '../../index.css';
import Board from './boardhistory'

import Config from '../Constant/configs'
import checkWin from '../Game/services'
import socket from '../socket.io'
import { Button } from "@material-ui/core";
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
import {Chat} from './chathistory/chat'
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({

    item: {
        display: 'flex',
        flexDirection: 'row',
        marginTop:10
    },


}));

function Game() {
    let { id } = useParams();
    const classes = useStyles();
   
    const [history, setHistory] = useState([
        {
            squares: Array(Config.brdSize * Config.brdSize).fill(null)
        }
    ]);
  
    const [nextMove, setNextMove] = useState(true);
    const [winCells, setWinCell] = useState(null);
    const [stepNumber, setstepNumber] = useState(0);
    const [step,setStep]=useState([]);
    const [clicktime,setClickTime]=useState(0);
    const [chat,setChat]=useState([]);
   
    
    const url = localStorage.getItem("backend");
    const token=JSON.parse(localStorage.getItem('token'));
     useEffect(() => {

  
  const res =  fetch(url+`detailmatch/${id}`, {
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
        setStep(result.move.move);
        setChat(result.chat.chat);
      console.log("knmkasnd ", result.chat.chat);
    })
    .catch((err) => {
     
      console.log("fail load history");
    });
  }, [])
 
    const handleClickBack=(i)=>{
        const history2 = history.slice(0, stepNumber + 1);
        const current = history2[history2.length - 1];
        const squares = current.squares.slice();
        if (winCells === null && squares[i] != null) {
            squares[i] = null;
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

        
            setstepNumber(history2.length);
            setNextMove(!nextMove);
          
        }
    }
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
            setWinCell(_winCells.winCells);
            setstepNumber(history2.length);
            setNextMove(!nextMove);
          
        }
    }
  
   
    // const disable=(winner==null)? true: false;
    const current = history[stepNumber];
    

    return (
        
        <div className="game">
          
            <div className="game-board">
                <Board
                    squares={current.squares}
                    winLine={winCells}
                />
            </div>

            <div className="game-info">              
                <div>
                    playerX: 
                
                </div>
                <div>
                    playerO:
                   
                </div>
                <div>
                <Button onClick={handleBack}>Back</Button>
                    <Button onClick={handleNext}>Next</Button>
                </div>
                <div>
                <Chat content={chat}/>
                </div>
            </div>
        </div>
       
    );
    function handleBack(){
        if(clicktime>=0){
            let temp=clicktime;
            temp=temp-1;
            console.log("click time ",clicktime);
            handleClickBack(step[temp]);
           
            setClickTime(temp);
        }
       
    }
    function handleNext(){
        let temp=clicktime;
        handleClick(step[clicktime]);
        temp=temp+1;
        if(temp<step.length){
            setClickTime(temp);
        }
    }
}

export default Game;
