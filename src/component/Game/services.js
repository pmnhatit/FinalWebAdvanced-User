import Config from '../Constant/configs'
function checkWin(i, user, stepNumber,history) {

    if (stepNumber === 0) {
        return {
            winCells:null,
            user:null
        };
    }
    const current = history[stepNumber];
    // console.log("current ",current);
    const squares = current.squares.slice();

    // Get coordinates
    const col =  i % Config.brdSize;
    const row =  Math.floor(i / Config.brdSize);
  
    let coorX = row;
    let coorY = col;

    let countCol = 1;
    let countRow = 1;
    let countMainDiagonal = 1;
    let countSkewDiagonal = 1;
    let isBlock;
    const rival = (user) ? "O" : "X";
    
    // Check col
    isBlock = true;
    let winCells = [];
    coorX -= 1;
   
    let t=coorX * Config.brdSize + coorY;
    while(coorX >= 0 && squares[t] === user) {
        countCol += 1;
         t=coorX * Config.brdSize + coorY;
        winCells.push(t);
        coorX -= 1;
        t=coorX * Config.brdSize + coorY;
    }
    t=coorX * Config.brdSize + coorY;
    if (coorX >= 0 && squares[t] !== rival) {
        isBlock = false;
    }
    coorX = row;
     t=coorX * Config.brdSize + coorY;
    winCells.push(t);
    coorX += 1;
    t=coorX * Config.brdSize + coorY;
    while(coorX <= Config.brdSize - 1 && squares[t] === user) {
        countCol += 1;
         t=coorX * Config.brdSize + coorY;
        winCells.push(t);
        coorX += 1;
        t=coorX * Config.brdSize + coorY;
    }
    t=coorX * Config.brdSize + coorY;
    if (coorX <= Config.brdSize - 1 && squares[t] !== rival) {
        isBlock = false;
    }
    coorX = row;
    if (isBlock === false && countCol >= 4) 
    return {
        winCells,
        user
    };

    // Check row
    isBlock = true;
    winCells = [];
    coorY -= 1;
    t=coorX * Config.brdSize + coorY;
    while(coorY >= 0 && squares[t] === user) {
        countRow += 1;
         t=coorX * Config.brdSize + coorY;
        winCells.push(t);
        coorY -= 1;
        t=coorX * Config.brdSize + coorY;
    }
    t=coorX * Config.brdSize + coorY;
    if (coorY >= 0 && squares[t] !== rival) {
        isBlock = false;
    }
    coorY = col;
     t=coorX * Config.brdSize + coorY;
    winCells.push(t);
    coorY += 1;
    t=coorX * Config.brdSize + coorY;
    while(coorY <= Config.brdSize - 1 && squares[t] === user) {
        countRow += 1;
         t=coorX * Config.brdSize + coorY;
        winCells.push(t);
        coorY += 1;
        t=coorX * Config.brdSize + coorY;
    }
    t=coorX * Config.brdSize + coorY;
    if (coorY <= Config.brdSize - 1 && squares[t] !== rival) {
        isBlock = false;
    }
    coorY = col;
   
    if (isBlock === false && countRow >= 4) 
    return {
        winCells,
        user
    };

    // Check main diagonal
    isBlock = true;
    winCells = [];
    coorX -= 1;
    coorY -= 1;
    t=coorX * Config.brdSize + coorY;
    while(coorX >= 0 && coorY >= 0 && squares[t] === user) {
        countMainDiagonal += 1;
         t=coorX * Config.brdSize + coorY;
        winCells.push(t);
        coorX -= 1;
        coorY -= 1;
        t=coorX * Config.brdSize + coorY;
    }
    t=coorX * Config.brdSize + coorY;
    if (coorX >= 0 && coorY >= 0 && squares[t] !== rival) {
        isBlock = false;
    }
    coorX = row;
    coorY = col;
    t=coorX * Config.brdSize + coorY;
    winCells.push(t);
    coorX += 1;
    coorY += 1;
    t=coorX * Config.brdSize + coorY;
    while(coorX <= Config.brdSize - 1 && coorY <= Config.brdSize - 1 && squares[t] === user) {
        countMainDiagonal += 1;
         t=coorX * Config.brdSize + coorY;
        winCells.push(t);
        coorX += 1;
        coorY += 1;
        t=coorX * Config.brdSize + coorY;
    }
    t=coorX * Config.brdSize + coorY;
    if (coorX <= Config.brdSize - 1 && coorY <= Config.brdSize - 1 && squares[t] !== rival) {
        isBlock = false;
    }
    coorX = row;
    coorY = col;
    if (isBlock === false && countMainDiagonal >= 4) 
    return {
        winCells,
        user
    };

    // Check skew diagonal
    isBlock = true;
    winCells = [];
    coorX -= 1;
    coorY += 1;
    t=coorX * Config.brdSize + coorY;
    while(coorX >= 0 && coorY >= 0 && squares[t] === user) {
        countSkewDiagonal += 1;
         t=coorX * Config.brdSize + coorY;
        winCells.push(t);
        coorX -= 1;
        coorY += 1;
        t=coorX * Config.brdSize + coorY;
    }
    t=coorX * Config.brdSize + coorY;
    if (coorX >= 0 && coorY >= 0 && squares[t] !== rival) {
        isBlock = false;
    }
    coorX = row;
    coorY = col;
     t=coorX * Config.brdSize + coorY;
    winCells.push(t);
    coorX += 1;
    coorY -= 1;
    t=coorX * Config.brdSize + coorY;
    while(coorX <= Config.brdSize - 1 && coorY <= Config.brdSize - 1 && squares[t] === user) {
        countSkewDiagonal += 1;
         t=coorX * Config.brdSize + coorY;
        winCells.push(t);
        coorX += 1;
        coorY -= 1;
        t=coorX * Config.brdSize + coorY;
    }
    t=coorX * Config.brdSize + coorY;
    if (coorX <= Config.brdSize - 1 && coorY <= Config.brdSize - 1 && squares[t] !== rival) {
        isBlock = false;
    }
    if (isBlock === false && countSkewDiagonal >= 4) 
    return {
        winCells,
        user
    };

    return {
        winCells:null,
        user:null
    };
}
export default checkWin;