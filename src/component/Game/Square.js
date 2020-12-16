import React from 'react';
import '../../index.css';
function Square(props) {
    const className = 'square' + (props.highlight ? ' highlight' : '');
    return (
      <button className={className}
        onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  export default Square;