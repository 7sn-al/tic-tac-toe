const tdList = document.querySelectorAll('td');
const playerX= document.querySelector('.playerx');
const playerO= document.querySelector('.playero');
const resetButton=document.querySelector('.reset');
const resetEverythingButton=document.querySelector('.reset-everything');
const condition= function(A){return (
    (A[0] === A[1] && A[1] === A[2] && A[0] !== null) ||
    (A[3] === A[4] && A[4] === A[5] && A[3] !== null) ||
    (A[6] === A[7] && A[7] === A[8] && A[6] !== null) ||
    (A[0] === A[3] && A[3] === A[6] && A[0] !== null) ||
    (A[1] === A[4] && A[4] === A[7] && A[1] !== null) ||
    (A[2] === A[5] && A[5] === A[8] && A[2] !== null) ||
    (A[0] === A[4] && A[4] === A[8] && A[0] !== null) ||
    (A[2] === A[4] && A[4] === A[6] && A[2] !== null)
  )
};

    const getWinningCells = function(A) {
  if (A[0] === A[1] && A[1] === A[2] && A[0] !== null) return [0,1,2];
  if (A[3] === A[4] && A[4] === A[5] && A[3] !== null) return [3,4,5];
  if (A[6] === A[7] && A[7] === A[8] && A[6] !== null) return [6,7,8];
  if (A[0] === A[3] && A[3] === A[6] && A[0] !== null) return [0,3,6];
  if (A[1] === A[4] && A[4] === A[7] && A[1] !== null) return [1,4,7];
  if (A[2] === A[5] && A[5] === A[8] && A[2] !== null) return [2,5,8];
  if (A[0] === A[4] && A[4] === A[8] && A[0] !== null) return [0,4,8];
  if (A[2] === A[4] && A[4] === A[6] && A[2] !== null) return [2,4,6];
  return null;
};

let scoreXNumb
er=0;
let scoreONumber=0;
let A = Array(9).fill(null);
let currentPlayer = 'X';
let isWin=false;
tdList.forEach(function(td, i) {
  td.addEventListener('click', function() {
    if (isWin) return;
    if (td.innerText === '') {
      if (currentPlayer === 'X') {
        playerX.innerText='Player X';
        td.innerText = 'X';
        td.style.color='white';
        currentPlayer = 'O';
        A[i] = 'X';
        playerO.innerText='Player O turn';
      } else if (currentPlayer === 'O') {
        playerO.innerText='Player O';
        td.innerText = 'O';
        td.style.color='white';
        currentPlayer = 'X';
        A[i] = 'O';
        playerX.innerText='Player X turn';
      }
    }

    if (condition(A)) {
      const win = document.createElement('span');
      win.style.color = 'white';
      document.body.appendChild(win);
      isWin=true;
      win.innerText = `Game over and winner is ${A[i]}`;
        resetButton.style.display='flex';
        resetEverythingButton.style.display='flex';
        const winningCells = getWinningCells(A);
        if (winningCells) {
        winningCells.forEach(i => {
        tdList[i].style.transform = 'scale(1.05)';
        tdList[i].style.transition = 'transform 0.3s ease';
        tdList[i].style.boxShadow= '0 0 10px rgb(255, 255, 255)';
    });
  }
        if (isWin && A[i] === 'X') {
  scoreXNumber++;
  document.querySelector('.scorex').innerText = `Score: ${scoreXNumber}`;
} else if (isWin && A[i] === 'O') {
  scoreONumber++;
  document.querySelector('.scoreo').innerText = `Score: ${scoreONumber}`;
} 

    }
    else if(!A.includes(null)) {
    const tie = document.createElement('span');
    tie.style.color = 'white';
    tie.innerText = "It's a tie!";
    document.body.appendChild(tie);
    isWin = true;
    resetButton.style.display = 'flex';
    resetEverythingButton.style.display = 'flex';
}
  });
});

resetButton.addEventListener('click', function () {
  tdList.forEach(function (td, i) {
    td.innerText = '';
    td.style.color = 'black';
    A[i] = null;
    td.style.transform = 'scale(1)';
    td.style.boxShadow='none';
  });

  currentPlayer = 'X';
  isWin = false;

  playerX.innerText = 'Player X';
  playerO.innerText = 'Player O';
  
  const winMessage = document.querySelector('body > span');
  win.innerText='';

  resetButton.style.display = 'none';
  resetEverythingButton.style.display = 'none';
  
});

resetEverythingButton.addEventListener('click', function () {
  tdList.forEach(function (td, i) {
    td.innerText = '';
    td.style.color = 'black';
    A[i] = null;
    document.querySelector('.scorex').innerText = `Score:0`;
    document.querySelector('.scoreo').innerText = `Score:0`;
    td.style.transform = 'scale(1)';
    td.style.boxShadow='none';
  });

  currentPlayer = 'X';
  isWin = false;

  playerX.innerText = 'Player X';
  playerO.innerText = 'Player O';


  const winMessage = document.querySelector('body > span');
  if (winMessage) {
    winMessage.remove();
  }

  resetEverythingButton.style.display = 'none';
  resetButton.style.display = 'none';

});