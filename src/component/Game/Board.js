import React from 'react';
import '../../index.css';
import Square from './Square'
import Config from '../Constant/configs'
function Board(props) {
    const renderSquare=(i)=> {
      const winLine = props.winLine;
      return (
        <Square
          value={props.squares[i]}
          onClick={() => props.onClick(i)}
          highlight={winLine && winLine.includes(i)}
        />
      );
    }
  
    
      const squares = Array(Config.brdSize);
      const boardLength = Config.brdSize;
      for (let i = 0; i < boardLength; i++) {
        let row = [];
        for (let j = 0; j < boardLength; j++) {
          row.push(renderSquare(i * boardLength + j));
        }
        squares.push(<div className="board-row">{row}</div>)
  
      }
      return (
        <div>{squares}</div>
      );
    
  }
  export default Board;