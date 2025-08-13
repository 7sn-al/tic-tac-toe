const tdList = document.querySelectorAll('td');
const playerX = document.querySelector('.playerx');
const playerO = document.querySelector('.playero');
const resetButton = document.querySelector('.reset');
const resetEverythingButton = document.querySelector('.reset-everything');

let scoreXNumber = 0;
let scoreONumber = 0;
let A = Array(9).fill(null);
let currentPlayer = 'X';
let isWin = false;

const condition = function (A) {
  return (
    (A[0] === A[1] && A[1] === A[2] && A[0] !== null) ||
    (A[3] === A[4] && A[4] === A[5] && A[3] !== null) ||
    (A[6] === A[7] && A[7] === A[8] && A[6] !== null) ||
    (A[0] === A[3] && A[3] === A[6] && A[0] !== null) ||
    (A[1] === A[4] && A[4] === A[7] && A[1] !== null) ||
    (A[2] === A[5] && A[5] === A[8] && A[2] !== null) ||
    (A[0] === A[4] && A[4] === A[8] && A[0] !== null) ||
    (A[2] === A[4] && A[4] === A[6] && A[2] !== null)
  );
};

const getWinningCells = function (A) {
  if (A[0] === A[1] && A[1] === A[2] && A[0] !== null) return [0, 1, 2];
  if (A[3] === A[4] && A[4] === A[5] && A[3] !== null) return [3, 4, 5];
  if (A[6] === A[7] && A[7] === A[8] && A[6] !== null) return [6, 7, 8];
  if (A[0] === A[3] && A[3] === A[6] && A[0] !== null) return [0, 3, 6];
  if (A[1] === A[4] && A[4] === A[7] && A[1] !== null) return [1, 4, 7];
  if (A[2] === A[5] && A[5] === A[8] && A[2] !== null) return [2, 5, 8];
  if (A[0] === A[4] && A[4] === A[8] && A[0] !== null) return [0, 4, 8];
  if (A[2] === A[4] && A[4] === A[6] && A[2] !== null) return [2, 4, 6];
  return null;
};

tdList.forEach(function (td, i) {
  td.addEventListener('click', function () {
    if (isWin || td.innerText !== '') return;

    const oldMessage = document.querySelector('body > span.message');
    if (oldMessage) oldMessage.remove();

    if (currentPlayer === 'X') {
      td.innerText = 'X';
      td.style.color = 'white';
      A[i] = 'X';
      currentPlayer = 'O';
      playerX.innerText = 'Player X';
      playerO.innerText = 'Player O turn';
    } else {
      td.innerText = 'O';
      td.style.color = 'white';
      A[i] = 'O';
      currentPlayer = 'X';
      playerO.innerText = 'Player O';
      playerX.innerText = 'Player X turn';
    }

    if (condition(A)) {
      isWin = true;
      const winner = A[i];
      const winMessage = document.createElement('span');
      winMessage.classList.add('message');
      winMessage.style.color = 'white';
      winMessage.innerText = `Game over and winner is ${winner}`;
      document.body.appendChild(winMessage);

      resetButton.style.display = 'flex';
      resetEverythingButton.style.display = 'flex';

      const winningCells = getWinningCells(A);
      if (winningCells) {
        winningCells.forEach(i => {
          tdList[i].style.transform = 'scale(1.05)';
          tdList[i].style.transition = 'transform 0.3s ease';
          tdList[i].style.boxShadow = '0 0 10px rgb(255, 255, 255)';
        });
      }

      if (winner === 'X') {
        scoreXNumber++;
        document.querySelector('.scorex').innerText = `Score: ${scoreXNumber}`;
      } else if (winner === 'O') {
        scoreONumber++;
        document.querySelector('.scoreo').innerText = `Score: ${scoreONumber}`;
      }

    } else if (!A.includes(null)) {
      isWin = true;
      const tieMessage = document.createElement('span');
      tieMessage.classList.add('message');
      tieMessage.style.color = 'white';
      tieMessage.innerText = "It's a tie!";
      document.body.appendChild(tieMessage);

      resetButton.style.display = 'flex';
      resetEverythingButton.style.display = 'flex';
    }
  });
});

resetButton.addEventListener('click', function () {
  tdList.forEach(function (td, i) {
    td.innerText = '';
    A[i] = null;

    td.style.removeProperty('color');
    td.style.removeProperty('transform');
    td.style.removeProperty('box-shadow');
  });

  currentPlayer = 'X';
  isWin = false;

  playerX.innerText = 'Player X';
  playerO.innerText = 'Player O';

  const message = document.querySelector('body > span.message');
  if (message) message.remove();

  resetButton.style.display = 'none';
  resetEverythingButton.style.display = 'none';
});

resetEverythingButton.addEventListener('click', function () {
  tdList.forEach(function (td, i) {
    td.innerText = '';
    A[i] = null;

    td.style.removeProperty('color');
    td.style.removeProperty('transform');
    td.style.removeProperty('box-shadow');
  });

  scoreXNumber = 0;
  scoreONumber = 0;

  document.querySelector('.scorex').innerText = 'Score: 0';
  document.querySelector('.scoreo').innerText = 'Score: 0';

  currentPlayer = 'X';
  isWin = false;

  playerX.innerText = 'Player X';
  playerO.innerText = 'Player O';

  const message = document.querySelector('body > span.message');
  if (message) message.remove();

  resetButton.style.display = 'none';
  resetEverythingButton.style.display = 'none';
});
