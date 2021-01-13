import React from 'react';
import '../../index.css';
function Square(props) {
    const className = 'square' + (props.highlight ? ' highlight' : '');
    return (
      <button className={className}
        >
        {/* {props.value} */}
         <font color='#00FFFF'>{props.value}</font>
      </button>
    );
  }
  export default Square;