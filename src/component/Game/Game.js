import React, { useState,useContext } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import '../../index.css';
import Board from './Board'
import checkWin from './services'
import Config from '../Constant/configs'
import socket from '../socket.io'
import {Button} from "@material-ui/core";
import { Context } from "../Constant/context";
function Game(props) {

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
    // setupSocket();
    socket.off('move');
    socket.on('move', function (data) {
        handleClick(data);
    });

    const handleClick = (i) => {
        console.log("click 2");
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
            console.log(_winCells);
            setstepNumber(history2.length);
            setNextMove(!nextMove);
            setWinCell(_winCells.winCells);
            setWinner(_winCells.user);
        }
    }

    const ourname = context.name;
    const room = props.roomInfo.playerX;
    var isPlayerX = ourname === room;

    const nameO=context.name;
    const roomO=props.roomInfo.playerO;
   
    var isPlayerO=nameO===roomO;
    
    function userClick(i) {
        // Prevent user click if rival is disconnected
        // if (needToDisable) {
        //     return;
        // }
        // Prevent user click if not his turn
        if ((isPlayerX && !nextMove) || (!isPlayerX && nextMove)) {
            return;
        }
        if((isPlayerX && nextMove)||(isPlayerO && !nextMove)){
            handleClick(i);
            socket.emit('move', i);
        }
        // Send move to server if it is valid
       

    }

    const jumpTo = (step) => {
        // setstepNumber(step);
        // setxIsNext((step % 2) === 0);
    }
    const handleSortToggle = () => {
        setAccending(!accendingMode);
    }
    const current = history[stepNumber];
    // const {row,col}=convert(i);
    // const winInfo = calculateWinner(current.squares);
    // const winner = winInfo.winner;
    const moves = history.map((step, move) => {
        const latestMoveSquare = step.latestMoveSquare;
        const col = 1 + latestMoveSquare % Config.brdSize;
        const row = 1 + Math.floor(latestMoveSquare / Config.brdSize);
        const desc = move ?
            `Go to move #${move} (${col}, ${row})` :
            'Go to game start';
        return (
            <li key={move}>
                <button
                    className={move === stepNumber ? 'move-list-item-selected' : ''}
                    onClick={() => requestUndo(move)}>{desc}</button>
            </li>
        );
    });
    //an nut luu
    const disable=(winner==null)? true: false;
    if (!accendingMode) {
        moves.reverse();
    }

    let status;
    if (winner != null) {
        status = "Winner: " + winner;
    } else {

        status = "Next player: "
        // + (xIsNext ? "X" : "O");

    }
    return (
        <div className="game">
            <Button onClick={(e) => handleSubmitHistory(e)} color="primary" disabled={disable}>
                Luu lai
            </Button>
            <div className="game-board">
                <Board

                    squares={current.squares}
                    onClick={i => userClick(i)}
                    winLine={winCells}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>

                <button onClick={() => handleSortToggle()}>
                    {accendingMode ? 'descending' : 'ascending'}
                </button>
                <ol>{moves}</ol>
            </div>
        </div>
    );
    function handleSubmitHistory(e){
        console.log(winner);
        const data={
            roomInfo: props.roomInfo.id,
            winner:winner
        }
        socket.emit("infoWinner",data);
    }

    // function setupSocket() {
    //     socket.off('move');
    //     socket.on('move', function (data) {
    //         handleClick(data);
    //     });


    // }
    function requestUndo(stepNumber) {

        // if (stepNumber === 0) {
        //     doConfirm('Bạn muốn chơi lại ?', () => {
        //         socket.emit('play-again-request', '');
        //         actions.actionRequest(true, `..! Đang chờ đối thủ đồng ý !..`);
        //     }, () => {});
        //     return;
        // }


        // const target = history[stepNumber];
        // var request = {
        //     stepNumber,
        //     latestMoveSquare: target.latestMoveSquare
        // };



        // doConfirm('Bạn muốn quay về lượt này ?', () => {
        //     socket.emit('undo-request', request);
        //     alert("... Đang chờ đối thủ trả lời ...");
        //     // actions.actionRequest(true, `... Đang chờ đối thủ trả lời ...`);
        // }, () => {});
    }
}
function convert(i) {
    const col = 1 + i % Config.brdSize;
    const row = 1 + Math.floor(i / Config.brdSize);
    return { col, row }
}
// function checkWin(row, col, user, stepNumber,history) {

//     if (stepNumber === 0) {
//         return null;
//     }


//     const current = history[stepNumber];
//     const squares = current.squares.slice();

//     // Get coordinates
//     let coorX = row;
//     let coorY = col;

//     let countCol = 1;
//     let countRow = 1;
//     let countMainDiagonal = 1;
//     let countSkewDiagonal = 1;
//     let isBlock;
//     const rival = (user === Config.xPlayer) ? Config.oPlayer : Config.xPlayer;

//     // Check col
//     isBlock = true;
//     let winCells = [];
//     coorX -= 1;
//     while(coorX >= 0 && squares[coorX][coorY] === user) {
//         countCol += 1;
//         winCells.push([coorX, coorY]);
//         coorX -= 1;
//     }
//     if (coorX >= 0 && squares[coorX][coorY] !== rival) {
//         isBlock = false;
//     }
//     coorX = row;
//     winCells.push([coorX, coorY]);
//     coorX += 1;
//     while(coorX <= Config.brdSize - 1 && squares[coorX][coorY] === user) {
//         countCol += 1;
//         winCells.push([coorX, coorY]);
//         coorX += 1;
//     }
//     if (coorX <= Config.brdSize - 1 && squares[coorX][coorY] !== rival) {
//         isBlock = false;
//     }
//     coorX = row;
//     if (isBlock === false && countCol >= 5) return winCells;

//     // Check row
//     isBlock = true;
//     winCells = [];
//     coorY -= 1;
//     while(coorY >= 0 && squares[coorX][coorY] === user) {
//         countRow += 1;
//         winCells.push([coorX, coorY]);
//         coorY -= 1;
//     }
//     if (coorY >= 0 && squares[coorX][coorY] !== rival) {
//         isBlock = false;
//     }
//     coorY = col;
//     winCells.push([coorX, coorY]);
//     coorY += 1;
//     while(coorY <= Config.brdSize - 1 && squares[coorX][coorY] === user) {
//         countRow += 1;
//         winCells.push([coorX, coorY]);
//         coorY += 1;
//     }
//     if (coorY <= Config.brdSize - 1 && squares[coorX][coorY] !== rival) {
//         isBlock = false;
//     }
//     coorY = col;
//     if (isBlock === false && countRow >= 5) return winCells;

//     // Check main diagonal
//     isBlock = true;
//     winCells = [];
//     coorX -= 1;
//     coorY -= 1;
//     while(coorX >= 0 && coorY >= 0 && squares[coorX][coorY] === user) {
//         countMainDiagonal += 1;
//         winCells.push([coorX, coorY]);
//         coorX -= 1;
//         coorY -= 1;
//     }
//     if (coorX >= 0 && coorY >= 0 && squares[coorX][coorY] !== rival) {
//         isBlock = false;
//     }
//     coorX = row;
//     coorY = col;
//     winCells.push([coorX, coorY]);
//     coorX += 1;
//     coorY += 1;
//     while(coorX <= Config.brdSize - 1 && coorY <= Config.brdSize - 1 && squares[coorX][coorY] === user) {
//         countMainDiagonal += 1;
//         winCells.push([coorX, coorY]);
//         coorX += 1;
//         coorY += 1;
//     }
//     if (coorX <= Config.brdSize - 1 && coorY <= Config.brdSize - 1 && squares[coorX][coorY] !== rival) {
//         isBlock = false;
//     }
//     coorX = row;
//     coorY = col;
//     if (isBlock === false && countMainDiagonal >= 5) return winCells;

//     // Check skew diagonal
//     isBlock = true;
//     winCells = [];
//     coorX -= 1;
//     coorY += 1;
//     while(coorX >= 0 && coorY >= 0 && squares[coorX][coorY] === user) {
//         countSkewDiagonal += 1;
//         winCells.push([coorX, coorY]);
//         coorX -= 1;
//         coorY += 1;
//     }
//     if (coorX >= 0 && coorY >= 0 && squares[coorX][coorY] !== rival) {
//         isBlock = false;
//     }
//     coorX = row;
//     coorY = col;
//     winCells.push([coorX, coorY]);
//     coorX += 1;
//     coorY -= 1;
//     while(coorX <= Config.brdSize - 1 && coorY <= Config.brdSize - 1 && squares[coorX][coorY] === user) {
//         countSkewDiagonal += 1;
//         winCells.push([coorX, coorY]);
//         coorX += 1;
//         coorY -= 1;
//     }
//     if (coorX <= Config.brdSize - 1 && coorY <= Config.brdSize - 1 && squares[coorX][coorY] !== rival) {
//         isBlock = false;
//     }
//     if (isBlock === false && countSkewDiagonal >= 5) return winCells;

//     return null;
// }


function doConfirm(message) {
    // <Dialog
    //     open={open}
    //     onClose={handleClose}
    //     aria-labelledby="alert-dialog-title"
    //     aria-describedby="alert-dialog-description"
    //   >
    //     <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
    //     <DialogContent>
    //       <DialogContentText id="alert-dialog-description">
    //        {message}
    //       </DialogContentText>
    //     </DialogContent>
    //     <DialogActions>
    //       <Button onClick={handleDisAgree} color="primary">
    //         Disagree
    //       </Button>
    //       <Button onClick={handleAgree} color="primary" autoFocus>
    //         Agree
    //       </Button>
    //     </DialogActions>
    //   </Dialog>

}

export default Game;
