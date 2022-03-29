/*----- constants -----*/
const colors = {'1': 'X', '-1': 'O', 'null': '' };

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/*----- app's state (variables) -----*/
let gameBoard;
let currentPlayerTurn;
let gameStatus;
/*----- cached element references -----*/
const squareEls = document.querySelectorAll('div');
const msgEl = document.querySelector('h2');
const resetBtn = document.getElementById('play-again-btn');
/*----- event listeners -----*/
document.querySelector('section').addEventListener('click', handlePlayerChoice);
resetBtn.addEventListener('click', init);
/*----- functions -----*/
init();

function init() {
  gameBoard = [null, null, null, null, null, null, null, null, null];
  currentPlayerTurn = 1;
  gameStatus = null;
  render();
};

function handlePlayerChoice(e) {
  const choice = parseInt(e.target.id.replace('sq', ''));
  console.log(e.target);
  if (gameBoard[choice] || gameStatus) return;
  gameBoard[choice] = currentPlayerTurn;
  currentPlayerTurn *= -1;
  gameStatus = handleWinner();
  render();
};

function handleWinner() {
  for (let i = 0; i < winConditions.length; i++) {
    if (Math.abs(gameBoard[0] + gameBoard[1] + gameBoard[2]) === 3)
      return gameBoard[0];
    if (Math.abs(gameBoard[3] + gameBoard[4] + gameBoard[5]) === 3)
      return gameBoard[3];
    if (Math.abs(gameBoard[6] + gameBoard[7] + gameBoard[8]) === 3)
      return gameBoard[6];
    if (Math.abs(gameBoard[0] + gameBoard[3] + gameBoard[6]) === 3)
      return gameBoard[0];
    if (Math.abs(gameBoard[1] + gameBoard[4] + gameBoard[7]) === 3)
      return gameBoard[1];
    if (Math.abs(gameBoard[2] + gameBoard[5] + gameBoard[8]) === 3)
      return gameBoard[2];
    if (Math.abs(gameBoard[0] + gameBoard[4] + gameBoard[8]) === 3)
      return gameBoard[0];
    if (Math.abs(gameBoard[2] + gameBoard[4] + gameBoard[6]) === 3)
      return gameBoard[2];
    if (gameBoard.includes(null)) return null;
    return 'T';
  }
};

function render() {
  gameBoard.forEach(function (sq, idx) {
    squareEls[idx].innerHTML = colors[sq];
  });
  if (gameStatus === 'T') {
    msgEl.innerHTML = `It's a tie!`;
  } else if (gameStatus) {
    msgEl.innerHTML = `Nice work ${colors[currentPlayerTurn]}, you pulled it off!`;
  } else {
    msgEl.innerHTML = `${colors[currentPlayerTurn]}'s turn, make your choice!`;
  }
};
